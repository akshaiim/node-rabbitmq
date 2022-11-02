const MQ = require('./amqp');
const MessagingStore = require('./messagingService');

// To get msgs from a queue
const receiveMessage = async (queueName, correlationId) => {
  let msgq = new MessagingStore('RabbitMq',queueName);
  await msgq.connect()
  await msgq.consume(queueName, correlationId)   
}
// receiveMessage()

module.exports = receiveMessage 
