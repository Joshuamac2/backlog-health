const {
  getTotalBlockedStoryPoints,
} = require("./getStoryPoints/getBlockedStoryPoints");
const {
  getTotalAvailableStoryPoints,
} = require("./getStoryPoints/getAvailableStoryPoints");
const {
  getTotalAwaitingStoryPoints,
} = require("./getStoryPoints/getAwaitingApproval");
const ChartJsImage = require("chartjs-to-image");

async function generateChartImage() {
  try {
    const totalAvailableStoryPointsPromise = getTotalAvailableStoryPoints();
    const totalBlockedStoryPointsPromise = getTotalBlockedStoryPoints();
    const totalAwaitingStoryPointsPromise = getTotalAwaitingStoryPoints();

    const totalAvailableStoryPoints = await totalAvailableStoryPointsPromise;
    const totalBlockedStoryPoints = await totalBlockedStoryPointsPromise;
    const totalAwaitingStoryPoints = await totalAwaitingStoryPointsPromise;

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
            label: "Blocked Story Points",
            data: [totalBlockedStoryPoints, totalAwaitingStoryPoints, totalAvailableStoryPoints],
            backgroundColor: ["#EC1D24", "#EC1D24", "#1D425A"],
          },
        ],
      },
    });

    const url = await myChart.getShortUrl();

    console.log("Chart image generated and saved successfully.", url);
    return url;
  } catch (error) {
    console.error("Error generating chart image:", error);
  }
}

module.exports = generateChartImage;
