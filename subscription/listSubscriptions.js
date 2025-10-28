const axios = require('axios');

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

        console.log('Subscriptions:', resp.data.subscriptions || []);
        return resp.data;
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
    await listSubscriptions(accessToken);
})();
