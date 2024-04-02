const fetch = require('cross-fetch');
require('dotenv').config();

API_TOKEN = process.env.API_TOKEN
JIRA_URL = process.env.JIRA_URL
CUSTOM_FIELD_ID = process.env.CUSTOM_FIELD_ID 

async function getAwaitingApproval() {
    const jqlQuery = encodeURIComponent('labels = phoscci_awaiting_approval AND issuetype != Sub-task AND status != "Blocked"');
    const fields = encodeURIComponent(`${CUSTOM_FIELD_ID},key,parent`);
    const apiUrl = `${JIRA_URL}/rest/api/2/search?jql=${jqlQuery}&fields=${fields}`;

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

        const responseData = await response.json(); 
        
        const awaitingApprovalData = responseData.issues.map(issue => {
            const parentIssue = issue.fields.parent;
            let epicName = 'N/A'; 
            let parentIssueLink = 'N/A'; 
            if (parentIssue) {
                const parentIssueId = parentIssue.key;
                if (parentIssue.fields && parentIssue.fields.summary) {
                    epicName = parentIssue.fields.summary;
                    parentIssueLink = `https://redantinternal.atlassian.net/browse/${parentIssueId}`;
                }
            }

            return {
                key: issue.key,
                epicName: epicName,
                storyPoints: issue.fields?.[CUSTOM_FIELD_ID] || 0,
                parentIssueLink: parentIssueLink 
            };
        });

        return awaitingApprovalData;
    } catch (error) {
        console.error('Error fetching awaiting approval data:', error);
        throw error;
    }
}

async function getTotalAwaitingStoryPoints() {
    try {
        const getAwaitingApprovalData = await getAwaitingApproval(); 

        const totalSPR = getAwaitingApprovalData.reduce((total, issue) => {
            return total + issue.storyPoints;
        }, 0);

        return totalSPR; 
    } catch (error) {
        console.error('Error fetching awaiting approval story points:', error);
        throw error; 
    }
}

module.exports = {
    getAwaitingApproval,
    getTotalAwaitingStoryPoints,
};
