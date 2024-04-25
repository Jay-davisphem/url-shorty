import express from 'express';
import {createShortURL, editShortURL, deactivateShortURL, redirectShortURL} from './controllers.js'
const router = express.Router();



router.post('/shorten', createShortURL);
router.put('/edit', editShortURL);
router.put('/deactivate', deactivateShortURL);
router.get('/:shortUrl', redirectShortURL);

export default router