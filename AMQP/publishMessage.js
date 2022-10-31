const MQ = require('./amqp');
const MessagingStore = require('./messagingService');

const publishMessage = async (queueName, payload) => {
    let msgq = new MessagingStore('RabbitMq',queueName);
    await msgq.connect()

    await msgq.publish(queueName, payload);
}

module.exports = publishMessage
