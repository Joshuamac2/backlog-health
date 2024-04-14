const express = require('express');
const router = express.Router();
const getAvailableTotal = require('../controllers/getStoryPoints/getAvailableStoryPoints');

router.get('/check-mood', async (req, res) => {
    try {
        const availableData = await getAvailableTotal.getAvailableSPRData();
        const totalStoryPoints = getAvailableTotal.calculateTotalStoryPoints(availableData);

        res.status(200).json(totalStoryPoints); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
