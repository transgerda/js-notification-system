const axios = require('axios');

/**
 * Create a Google Workspace Events subscription.
 * @param {string} accessToken — OAuth 2.0 access token
 * @param {object} subscriptionBody — body per Subscription spec
 */
async function createSubscription(accessToken, subscriptionBody) {
    // The REST path for create: POST https://events.googleapis.com/v1/subscriptions
    const url = 'https://workspaceevents.googleapis.com/v1/subscriptions';

    try {
        const resp = await axios.post(url, subscriptionBody, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Subscription created:', resp.data);
        return resp.data;
    } catch (err) {
        if (err.response) {
            console.error('API error:', err.response.status, err.response.data);
        } else {
            console.error('Request error:', err.message);
        }
        throw err;
    }
}

// Example usage:
(async () => {
    const accessToken = '';
    const body = {
        // Required fields per the subscription schema:
        targetResource: '//chat.googleapis.com/spaces/-',
        eventTypes: [
            'google.workspace.chat.message.v1.created',
            'google.workspace.chat.message.v1.deleted',
            'google.workspace.chat.message.v1.updated'
        ],
        notificationEndpoint: {
            pubsubTopic: 'projects/tuwi-portal/topics/workspace-events-topic'
        },
        // Optionally:
        payloadOptions: {
            includeResource: true,
        },
        // Optionally, initial TTL or expireTime
        ttl: '3600s'
    };

    try {
        const subscription = await createSubscription(accessToken, body);
        console.log('Created subscription object:', subscription);
    } catch (err) {
        console.error('Failed to create subscription:', err);
    }
})();

const result = {
    name: 'operations/CksKP2N6b3RPakV4TWpJM05EUXlOVFV5TmpRMk9UZzROekEzTmpveE1ERTNPVFUwTkRFNE5UWXpNVFk0TmpFM05USRABGgZzcGFjZXMaCwjw18_GBhCQhrFLIgAoAQ',
        metadata: {
        '@type': 'type.googleapis.com/google.apps.events.subscriptions.v1.CreateSubscriptionMetadata'
    },
    done: true,
        response: {
        '@type': 'type.googleapis.com/google.apps.events.subscriptions.v1.Subscription',
            name: 'subscriptions/chat-spaces-czotOjExMjI3NDQyNTUyNjQ2OTg4NzA3NjoxMDE3OTU0NDE4NTYzMTY4NjE3NTI',
            uid: 'chat-spaces-czotOjExMjI3NDQyNTUyNjQ2OTg4NzA3NjoxMDE3OTU0NDE4NTYzMTY4NjE3NTI',
            targetResource: '//chat.googleapis.com/spaces/-',
            eventTypes: [
            'google.workspace.chat.message.v1.created',
            'google.workspace.chat.message.v1.deleted',
            'google.workspace.chat.message.v1.updated'
        ],
            payloadOptions: {},
        notificationEndpoint: {
            pubsubTopic: 'projects/tuwi-portal/topics/workspace-events-topic'
        },
        state: 'ACTIVE',
            authority: 'users/112274425526469887076',
            createTime: '2025-09-24T13:02:40.158090Z',
            updateTime: '2025-09-24T13:02:40.158090Z',
            expireTime: '2025-09-24T14:02:39.629980Z',
            etag: '"cb9770d6"'
    }
};