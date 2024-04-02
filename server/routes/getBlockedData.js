const express = require('express');
const router = express.Router();
const getBlockedSP = require('../controllers/getStoryPoints/getBlockedStoryPoints');

router.get('/blocked-table', async (req, res) => {
    try {
        const data = await getBlockedSP.getBlockedSPR();
        res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
