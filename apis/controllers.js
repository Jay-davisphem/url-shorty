import { comparePassword, encryptPassword } from "../utils.js";
import URL from "./db.js";
import { nanoid, customAlphabet } from 'nanoid';
import NodeCache from "node-cache";

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const _nanoid = customAlphabet(alphabet, 7); // You can customize the length (e.g., 7 characters)

const cache = new NodeCache();

export async function createShortURL(req, res){
    try {
        const { longUrl, expiredAt, customShortUrl } = req.body;
        let shortUrl;

        if (customShortUrl) {
            // Check if the custom short URL already exists in the database
            const existingURL = await URL.findOne({ shortUrl: customShortUrl });
            
            if (existingURL) {
                return res.status(400).json({ error: 'Custom short URL is already in use' });
            }
            
            shortUrl = customShortUrl;
        } else {
            // Generate a random short URL using _nanoid
            shortUrl = _nanoid(7); 
        }

        // Randomly generate security code
        const securityCode = nanoid(12);

        // Encrypt security code
        const encryptedSecurityCode = await encryptPassword(securityCode);

        // Create a new URL entry in the database
        const newURL = new URL({
            longUrl,
            expiredAt,
            shortUrl,
            securityCode: encryptedSecurityCode,
        });

        // Save the new URL record in the database
        await newURL.save();

        // Respond with the generated or provided short URL and security code
        res.status(201).json({
            success: true,
            shortUrl,
            securityCode,
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' });
    }
};

export async function editShortURL(req, res){
    try {
        const { shortUrl, securityCode, longUrl, expiredAt } = req.body;

        // Find the URL by short URL and security code
        const urlRecord = await URL.findOne({ shortUrl });

        if (!comparePassword(securityCode, urlRecord.securityCode)){
            return res.status(401).json({error: 'Wrong security code'})
        }

        if (!urlRecord) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Update the URL record
        urlRecord.longUrl = longUrl || urlRecord.longUrl;
        if (expiredAt) {
            const now = new Date();
            const newExpiryDate = new Date(expiredAt);

            // Check if the new expiry date is in the past
            if (newExpiryDate <= now) {
                // Deactivate the URL since the new expiry date has elapsed
                urlRecord.isActive = false;
            } else {
                // If the new expiry date is in the future, update it and reactivate the URL if needed
                urlRecord.expiredAt = newExpiryDate;
                if (!urlRecord.isActive) {
                    urlRecord.isActive = true;
                }
            }
        }
        
        await urlRecord.save();
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export async function deactivateShortURL(req, res){
    try {
        const { shortUrl, securityCode } = req.body;

        // Find the URL by short URL and security code
        const urlRecord = await URL.findOne({ shortUrl });

        if (!comparePassword(securityCode, urlRecord.securityCode)){
            return res.status(401).json({error: 'Wrong security code'})
        }

        if (!urlRecord) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Mark the URL as deactivated
        urlRecord.isActive = false;
        await urlRecord.save();
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export async function redirectShortURL(req, res){

    try {
        const { shortUrl } = req.params;
        let urlRecord = cache.get(shortUrl);

        if (!urlRecord){

            // Find the URL by short URL
            urlRecord = await URL.findOne({ shortUrl });
            console.log('Cache miss')
            if (!urlRecord) {
                return res.status(404).json({ error: 'URL not found' });
            }

            cache.set(shortUrl, urlRecord, 
                urlRecord.expiredAt ? 
                Math.max(urlRecord.expiredAt - Date.now(), 0) / 1000 : 
                undefined);
        } else{
            console.log('Cache hit', cache)
        }

        // Check if the URL is active
        if (!urlRecord.isActive) {
            return res.status(410).json({ error: 'URL is deactivated' });
        }

        // Redirect to the long URL
        res.redirect(urlRecord.longUrl);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
