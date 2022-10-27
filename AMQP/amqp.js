const amqp = require('amqplib');
require('dotenv').config();

module.exports = class MQ {
    constructor(queue) {
        this.conn;
        this.uri = process.env.RABBITMQ_CONNECTION_URL;
        this.channel;
        this.queue = queue;
    }

    async setupConnection() {
        this.conn = await amqp.connect(this.uri);
        this.channel = await this.conn.createChannel();

        await this.channel.assertQueue(this.queue, { durable: false });
    }

    publish(queueName, msg) {
        this.channel.sendToQueue(queueName, Buffer.from(msg));
        console.log('message sent', msg);
    }

    async subscribe(queueName) {
        await this.channel.consume(queueName,
            (msg) => {
                const result = msg.content.toString();
                console.log(`Received msg ${result}`);
            }
        )

    };
}