require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const getCheckMood = require('./routes/getCheckMood');
const getAwaitingData = require('./routes/getAwaitingData');
const getBlockedData = require('./routes/getBlockedData');
const getTotalData = require('./routes/getTotalData');
const postSendReport = require('./routes/postSendReport');

app.use('/api', getCheckMood);
app.use('/api', getAwaitingData);
app.use('/api', getBlockedData);
app.use('/api', getTotalData);
app.use('/api', postSendReport);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
