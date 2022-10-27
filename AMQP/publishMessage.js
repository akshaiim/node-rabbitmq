const MQ = require('./amqp');

const publishMessage = async (queueName, payload) => {
    let msgq = new MQ(queueName);
    msgq.setupConnection()
.then(() => {
    msgq.publish(queueName, payload);
})
}

module.exports = publishMessage
