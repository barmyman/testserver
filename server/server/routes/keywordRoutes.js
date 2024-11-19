const express = require('express');
const router = express.Router();
const keywords = require('../data/keywords.json');

router.post('/', (req, res) => {
    const { keyword } = req.body;
    if (!keyword || !keywords[keyword]) {
        return res.status(404).json({ error: 'Keyword not found' });
    }
    res.json({ urls: keywords[keyword] });
});

module.exports = router;