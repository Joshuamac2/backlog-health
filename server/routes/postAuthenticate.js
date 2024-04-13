const express = require('express');
const router = express.Router();

router.use(express.json()); 

const SECRET_KEY = process.env.SECRET_KEY; 

router.post('/authenticate', async (req, res) => {
    try {
        const { secret } = req.body;
        if (secret === SECRET_KEY) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Invalid secret key' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
