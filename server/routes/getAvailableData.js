const express = require('express');
const router = express.Router();
const getAvailableSPR = require('../controllers/getStoryPoints/getAvailableStoryPoints');

router.get('/available-table', async (req, res) => {
    try {
        const data = await getAvailableSPR.getAvailableSPRData();
        res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
