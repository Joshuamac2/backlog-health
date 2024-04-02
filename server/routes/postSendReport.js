const express = require('express');
const router = express.Router();
const useSendReport = require('../controllers/sendReport');

router.use(express.json());

router.post('/send-report', async (req, res) => {
    try {
        const { email } = req.body; 
        const data = await useSendReport.sendReport(email); 
        res.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
