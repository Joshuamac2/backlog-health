const fetch = require('cross-fetch');
require('dotenv').config();

API_TOKEN = process.env.API_TOKEN
JIRA_URL = process.env.JIRA_URL
CUSTOM_FIELD_ID = process.env.CUSTOM_FIELD_ID 

async function getAvailableSPR() {
    const jqlQuery = encodeURIComponent('labels = phoscci_ready AND issuetype != Sub-task AND status != "Blocked"');
    const apiUrl = `${JIRA_URL}/rest/api/2/search?jql=${jqlQuery}&fields=${CUSTOM_FIELD_ID},key`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    `joshua.macleod@redant.com:${API_TOKEN}`
                ).toString('base64')}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch issues: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); 

        return data; 
    } catch (error) {
        console.error('Error fetching available SPR:', error);
        throw error;
    }
}

async function getTotalAvailableStoryPoints() {
    try {
      const data = await getAvailableSPR(); 
      const issues = data.issues;
  
      const totalSPR = calculateTotalSPR(issues);
    
      return totalSPR;
    } catch (error) {
      console.error('Error fetching available story points:', error);
      throw error; 
    }
}

function calculateTotalSPR(issues) {
    const total = issues.reduce((acc, issue) => {
        if (issue.fields && issue.fields[CUSTOM_FIELD_ID] !== null && issue.fields[CUSTOM_FIELD_ID] !== undefined) {
            const storyPoints = issue.fields[CUSTOM_FIELD_ID];
            acc += storyPoints;
        }
        return acc;
    }, 0);

    return total;
}

module.exports = {
    getAvailableSPR,
    calculateTotalSPR,
    getTotalAvailableStoryPoints,
};