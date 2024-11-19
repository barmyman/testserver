const express = require('express');
const axios = require('axios');
const fs = require('fs');
const router = express.Router();

const config = {
    maxThreads: 5,
    speedLimit: 500000
};

router.post('/', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
        const response = await axios.get(url, { responseType: 'stream' });
        const filePath = `./downloads/${Date.now()}.html`;
        const writer = fs.createWriteStream(filePath);

        let totalSize = parseInt(response.headers['content-length'], 10);
        let downloaded = 0;

        response.data.on('data', chunk => {
            downloaded += chunk.length;
            console.log(`Progress: ${(downloaded / totalSize) * 100}%`);
        });

        response.data.pipe(writer);

        writer.on('finish', () => {
            res.json({ message: 'Download complete', filePath });
        });

        writer.on('error', err => {
            res.status(500).json({ error: 'Error writing file', details: err });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error downloading file', details: error.message });
    }
});

module.exports = { router };