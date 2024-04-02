require("dotenv").config();
const generateChartImage = require("./generateChartImage");
const blockedTable = require("./tables/blockedTable.js");
const awaitingApprovalTable = require("./tables/awaitingApprovalTable.js");

const Sib = require("sib-api-v3-sdk");
const { TransactionalEmailsApi } = require("sib-api-v3-sdk");
const tranEmailAPI = new TransactionalEmailsApi();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

async function sendReport(email) {
  const sender = {
    email: "joshuamacleod@live.com",
  };

  const receiver = {
    email: email, 
  };

  try {
    const chartImageUrl = await generateChartImage();
    const blockedTableHTML = await blockedTable();
    const awaitingClientTableHTML = await awaitingApprovalTable();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Weekly Backlog Health Report</title>
        </head>
        <body>
            <!-- Description -->
            <h2>Weekly Backlog Health Report - Generated on ${formattedDate}</h2>
            <p>
            This is your weekly backlog health report. Below, you'll find key metrics on our backlog status. We track available story points for sprints and the total number of blocked story points. "Blocked story points" represent tasks awaiting client input, while "Awaiting Client Approvals" are tickets ready for client review, but have not signed off yet. Additionally, we highlight available story points for the up and comming sprints. For more details, refer to the tables with links to blocked and awaiting client approval Jira stories.
            </p>

            <!-- Bar Chart Header -->
            <h3>Backlog Health Overview</h3>

            <!-- Bar Chart Placeholder -->
            <div>
                <img src="${chartImageUrl}" alt="Chart Report" style="max-width: 100%;">
            </div>
            <br></br>

            <!-- Table Header -->
            <h3>Blocked Stories</h3>

            <!-- Table Placeholder -->
            <div>
                ${blockedTableHTML} <!-- Insert the table here -->
            </div>
            <br></br>

            <!-- Table Header -->
            <h3>Awaiting Client Approvals</h3>

            <!-- Table Placeholder -->
            <div>
                ${awaitingClientTableHTML} <!-- Insert the table here -->
            </div>
            <br></br>

            <!-- Footer -->
            <p>Regards,</p>
            <p>Joshua Macleod</p>
        </body>
        </html>
    `;

    const response = await tranEmailAPI.sendTransacEmail({
      sender,
      to: [receiver],
      subject: `Weekly Backlog Health Report - Generated on ${formattedDate}`,
      htmlContent,
    });

    console.log(receiver)

    console.log("Message sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendReport }; 
