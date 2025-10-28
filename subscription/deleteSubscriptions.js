const axios = require('axios');

/**
 * Delete a Workspace Events subscription.
 * @param {string} accessToken - OAuth 2.0 token
 * @param {string} subscriptionName - full resource name of the subscription
 */
async function deleteSubscription(accessToken, subscriptionName) {
    const url = `https://workspaceevents.googleapis.com/v1/${subscriptionName}`;

    try {
        const resp = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log(`Deleted subscriptions: ${subscriptionName}`, resp.status);
    } catch (err) {
        if (err.response) {
            console.error(
                'API error:',
                err.response.status,
                JSON.stringify(err.response.data, null, 2)
            );
        } else {
            console.error('Request error:', err.message);
        }
        throw err;
    }
}

async function listSubscriptions(accessToken) {
    const url = 'https://workspaceevents.googleapis.com/v1/subscriptions';

    try {
        const resp = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                // REQUIRED: filter must include at least one event_types clause
                filter: 'event_types:"google.workspace.chat.message.v1.created"',
                pageSize: 50, // optional
            },
        });

        // console.log('Subscriptions:', resp.data.subscriptions || []);
        return resp.data.subscriptions[0].name;
    } catch (err) {
        if (err.response) {
            console.error(
                'API error:',
                err.response.status,
                JSON.stringify(err.response.data, null, 2)
            );
        } else {
            console.error('Request error:', err.message);
        }
        throw err;
    }
}

// Example usage
(async () => {
    const accessToken = '';
    const subscriptionName = await listSubscriptions(accessToken); // comes from list/create

    try {
        await deleteSubscription(accessToken, subscriptionName);
    } catch (e) {
        console.error('Failed to delete subscription:', e);
    }
})();
