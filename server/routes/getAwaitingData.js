const express = require('express');
const router = express.Router();
const getAwaitingSPR = require('../controllers/getStoryPoints/getAwaitingApproval');

router.get('/awaiting-table', async (req, res) => {
    try {
        const data = await getAwaitingSPR.getAwaitingApproval();
        res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
