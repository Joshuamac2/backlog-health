const fetch = require('cross-fetch');
require('dotenv').config();

const API_TOKEN = process.env.API_TOKEN;
const JIRA_URL = process.env.JIRA_URL;
const CUSTOM_FIELD_ID = process.env.CUSTOM_FIELD_ID;
const MAX_RESULTS = 50;

async function fetchJiraIssues(startAt) {
    const jqlQuery = encodeURIComponent(`labels in (phoscci_ready, phoscci_refinementrequired, phoscci_timingrequired) AND labels != phoscci_awaiting_approval AND issuetype != Sub-task AND status = "To Do"`);
    const fields = encodeURIComponent(`${CUSTOM_FIELD_ID},key,parent`);
    const apiUrl = `${JIRA_URL}/rest/api/2/search?jql=${jqlQuery}&fields=${fields}&startAt=${startAt}&maxResults=${MAX_RESULTS}`;

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
    return responseData.issues;
}

function filterIssues(issues) {
    return issues
        .filter(issue => issue.fields && issue.fields.parent)
        .filter(issue => issue.key.startsWith('MSS'))
        .map(issue => {
            const parentIssue = issue.fields.parent;
            const epicKey = parentIssue.key;
            const epicName = parentIssue.fields.summary;
            const parentIssueLink = `https://redantinternal.atlassian.net/browse/${epicKey}`;

            return {
                key: issue.key,
                epicName: epicName,
                storyPoints: issue.fields?.[CUSTOM_FIELD_ID] || 0,
                parentIssueLink: parentIssueLink
            };
        });
}

function calculateTotalStoryPoints(issues) {
    return issues.reduce((acc, issue) => {
        acc += issue.storyPoints || 0;
        return acc;
    }, 0);
}

async function getAvailableSPRData() {
    let allIssues = [];
    let startAt = 0;

    try {
        while (true) {
            const issues = await fetchJiraIssues(startAt);
            if (issues.length === 0) {
                break;
            }
            allIssues = allIssues.concat(issues);
            startAt += MAX_RESULTS;
        }

        const filteredIssues = filterIssues(allIssues);
        return filteredIssues;
    } catch (error) {
        console.error('Error fetching available SPR data:', error);
        throw error;
    }
}

module.exports = {
    getAvailableSPRData,
    calculateTotalStoryPoints,
};
