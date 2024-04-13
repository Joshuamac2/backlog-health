const {
    getTotalBlockedStoryPoints,
} = require("./getBlockedStoryPoints");
  const {
    getAvailableSPRData, calculateTotalStoryPoints
  } = require("./getAvailableStoryPoints.js");
  const {
    getTotalAwaitingStoryPoints,
  } = require("./getAwaitingApproval");

  
  async function getTotalStoryPoints() {
    
    const getAvailableData = await getAvailableSPRData();
    const calculatAvailableData = calculateTotalStoryPoints(getAvailableData);

    const getAwaitingData = await getTotalAwaitingStoryPoints();
    const getBlockedData = await getTotalBlockedStoryPoints();

    return calculatAvailableData + getAwaitingData + getBlockedData;

  }

module.exports = { getTotalStoryPoints };
