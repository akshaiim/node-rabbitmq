const amqp = require('amqplib')

// To get msgs from a queue
const receiveMessage = async (queueName) => {
async function connect() {
    const amqpServer = process.env.RABBITMQ_CONNECTION_URL;
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
  }
  
  connect().then(() => {
    channel.consume(queueName, data => {
      console.log(`consuming ${queueName} service`);
      const msg = data.content.toString()
      console.log(msg)
    });
  });
}
// receiveMessage()

module.exports = receiveMessage
