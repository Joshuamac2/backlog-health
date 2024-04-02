const express = require('express');
const router = express.Router();
const getAvailableSPR = require('../controllers/getStoryPoints/getAvailableStoryPoints');
const getAwaitingSPR = require('../controllers/getStoryPoints/getAwaitingApproval');
const getBlockedSPR = require('../controllers/getStoryPoints/getBlockedStoryPoints');

router.get('/available', async (req, res) => {
    try {
        const data = await getAvailableSPR.getTotalAvailableStoryPoints();
        res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/awaiting', async (req, res) => {
    try {
        const data = await getAwaitingSPR.getTotalAwaitingStoryPoints();
        res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/blocked', async (req, res) => {
    try {
        const data = await getBlockedSPR.getTotalBlockedStoryPoints();
        res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
