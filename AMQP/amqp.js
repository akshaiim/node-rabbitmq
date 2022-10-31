const amqp = require('amqplib');
require('dotenv').config();

module.exports = class MQ {
    constructor(queue) {
        this.conn;
        this.uri = process.env.RABBITMQ_CONNECTION_URL;
        this.channel;
        this.queue = queue;
    }

    async connect () {

        this.conn = await amqp.connect(this.uri);
        this.channel = await this.conn.createChannel();

        await this.channel.assertQueue(this.queue, { durable: false });
    }

    async publish(queueName, msg) {
        if (!this.conn) {
            await this.connect()
        }
        this.channel.sendToQueue(queueName, Buffer.from(msg));
        console.log('message sent', msg);
    }

    async disconnect() {
        if (!this.channel) return;
        await this.channel.close();
        this.channel = null;
    }


    async consume(queueName) {
        if (!this.conn) {
            await this.connect()
        }
        await this.channel.consume(queueName,
            (msg) => {
                const result = msg.content.toString();
                console.log(`Received msg ${result}`);
                this.acknowledge(msg)
            }
        )

    };

    async acknowledge(msg) {
        this.channel.ack(msg);

    }
}