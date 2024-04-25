import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
// Define a custom alphabet and length for the nanoid
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 7); // You can customize the length (e.g., 7 characters)

// Define the URL schema
const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    expiredAt: {
        type: Date,
        required: true
    },
    securityCode: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    
}, {
    timestamps: true
});

const URL = mongoose.model('URL', urlSchema);
export default URL