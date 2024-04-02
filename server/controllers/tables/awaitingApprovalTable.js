const { getAwaitingApproval } = require("../getStoryPoints/getAwaitingApproval");

async function awaitingApprovalTable() {
  try {
    const getAwaitingApprovalDataPromise = getAwaitingApproval();
    const getAwaitingApprovalData = await getAwaitingApprovalDataPromise;

    function generateHTMLTable() {
      let html = `
        <html>
        <head>
            <title>Awaiting Client Approval Issues</title>
        </head>
        <body>
            <table style="border-collapse: collapse; width: 100%;">
                <tr style="background-color: #1D425A; color: #ffffff;">
                    <th style="padding: 8px; border: 1px solid #1D425A; text-align: left;">Epic</th>
                    <th style="padding: 8px; border: 1px solid #1D425A; text-align: left;">MSS ID</th>
                    <th style="padding: 8px; border: 1px solid #1D425A; text-align: left;">URL Link</th>
                    <th style="padding: 8px; border: 1px solid #1D425A; text-align: left;">Story Points</th>
                </tr>`;
      
      // Check if data is available before iterating
      if (getAwaitingApprovalData) {
        getAwaitingApprovalData.forEach((row, index) => {
          const jiraUrl = `https://redantinternal.atlassian.net/browse/${row.key}`;
          const rowColor = index % 2 === 0 ? "#ffffff" : "#f2f2f2";
          html += `<tr style="background-color: ${rowColor}; color: #1A1A1A;"> 
                              <td style="padding: 8px; border: 1px solid #ffffff;">${row.epicName}</td>
                              <td style="padding: 8px; border: 1px solid #ffffff;">${row.key}</td>
                              <td style="padding: 8px; border: 1px solid #ffffff;"><a href="${jiraUrl}" target="_blank">${jiraUrl}</a></td>
                              <td style="padding: 8px; border: 1px solid #ffffff;">${row.storyPoints}</td>
                          </tr>`;
        });
      }

      html += `</table></body></html>`;
      return html;
    }

    const tableHTML = generateHTMLTable();
    return tableHTML;
  } catch (error) {
    console.error("Error generating table:", error);
  }
}

module.exports = awaitingApprovalTable;
