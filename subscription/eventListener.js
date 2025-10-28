const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub({
    projectId: 'tuwi-portal',
    keyFilename: './serviceaccount-credentials.json'
    // if running locally, make sure GOOGLE_APPLICATION_CREDENTIALS is set
});

const subscriptionName = 'projects/tuwi-portal/subscriptions/workspace-events-sub';
const subscription = pubsub.subscription(subscriptionName);

// Event handler
function handleMessage(message) {
    console.log('Received event:');
    console.log(`  ID: ${message.id}`);
    console.log(`  Data: ${message.data.toString()}`);
    console.log(`  Attributes: ${JSON.stringify(message.attributes)}`);

    // Acknowledge message so it won’t be redelivered
    message.ack();
}

// Listen for new messages
subscription.on('message', handleMessage);

subscription.on('error', (error) => {
    console.error('Subscriber error:', error);
});

console.log(`Listening for events on ${subscriptionName}...`);
