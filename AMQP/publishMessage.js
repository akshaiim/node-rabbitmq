const MQ = require('./amqp');
const { execute } = require('./handleMessage');
const MessagingStore = require('./messagingService');
const receiveMessage = require('./receiveMessage');
const { v4: uuidv4 } = require('uuid');

const publishMessage = async (queueName, payload) => {
    const correlationId = uuidv4();
    let msgq = new MessagingStore('RabbitMq',queueName);
    await msgq.connect()
    await msgq.publish(queueName, payload,  { correlationId, replyTo: 'postresponse' });
    await receiveMessage(queueName) 
    await msgq.consume('postresponse', correlationId)
}

module.exports = publishMessage

