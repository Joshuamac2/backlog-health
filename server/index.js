require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://backlog-health.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const getCheckMood = require('./routes/getCheckMood');
const getAvailableData = require('./routes/getAvailableData');
const getAwaitingData = require('./routes/getAwaitingData');
const getBlockedData = require('./routes/getBlockedData');
const getTotalData = require('./routes/getTotalData');
const postAuthenticate = require('./routes/postAuthenticate');
const postSendReport = require('./routes/postSendReport');

app.use('/api', getCheckMood);
app.use('/api', getAvailableData);
app.use('/api', getAwaitingData);
app.use('/api', getBlockedData);
app.use('/api', getTotalData);
app.use('/api', postAuthenticate);
app.use('/api', postSendReport);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
