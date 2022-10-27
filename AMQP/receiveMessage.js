const MQ = require('./amqp');

const receiveMessage = async (queueName, payload) => {
    var queueName = 'posts'
    let msgq = new MQ(queueName);
    msgq.setupConnection()
.then(() => {
msgq.subscribe(queueName)
})
}
receiveMessage()

module.exports = receiveMessage
