const express = require('express');
const router = express.Router();
const getAvailableTotal = require('../controllers/getStoryPoints/getAvailableStoryPoints');

router.get('/check-mood', async (req, res) => {
    try {
        const data = await getAvailableTotal.getTotalAvailableStoryPoints();
        res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
