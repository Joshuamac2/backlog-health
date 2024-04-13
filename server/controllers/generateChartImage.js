const {
  getTotalBlockedStoryPoints,
} = require("./getStoryPoints/getBlockedStoryPoints");
const {
  getAvailableSPRData, calculateTotalStoryPoints
} = require("./getStoryPoints/getAvailableStoryPoints");
const {
  getTotalAwaitingStoryPoints,
} = require("./getStoryPoints/getAwaitingApproval");
const ChartJsImage = require("chartjs-to-image");

async function generateChartImage() {
  try {
    const availableData = await getAvailableSPRData(); 
    const totalAvailableStoryPoints = await calculateTotalStoryPoints(availableData); 
    const totalBlockedStoryPoints = await getTotalBlockedStoryPoints();
    const totalAwaitingStoryPoints = await getTotalAwaitingStoryPoints();

    const myChart = new ChartJsImage();
    myChart.setConfig({
      type: "bar",
      data: {
        labels: [
          "Blocked Story Points",
          "Awaiting Client Approval",
          "Available Story Points",
        ],
        datasets: [
          {
            label: "Story Points",
            data: [totalBlockedStoryPoints, totalAwaitingStoryPoints, totalAvailableStoryPoints],
            backgroundColor: ["#EC1D24", "#EC1D24", "#1D425A"],
          },
        ],
      },
    });

    const url = await myChart.getShortUrl();

    // console.log("Chart image generated and saved successfully.", url);
    return url;
  } catch (error) {
    console.error("Error generating chart image:", error);
    throw error; 
  }
}

module.exports = {
  generateChartImage
};
