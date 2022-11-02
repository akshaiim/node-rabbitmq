const amqp = require('amqplib');
require('dotenv').config();

/**
 * Represents rabbitmq class for publishing and consuming messages via rpc.
 * @constructor
 * @param {string} queue - The queue name where the data needs to be published/consumed.
 */

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

    async publish(queueName, msg, prop) {
        if (!this.conn) {
            await this.connect()
        }
        this.channel.assertQueue(queueName,{durable:false})
        this.channel.sendToQueue(queueName, Buffer.from(msg), prop);
        console.log('message sent', msg);
    }

    async disconnect() {
        if (!this.channel) return;
        await this.channel.close();
        this.channel = null;
    }


    async consume(queueName, correlationId) {
        if (!this.conn) {
            await this.connect()
        }
        this.channel.prefetch(1)
        const data = await this.channel.consume(queueName,
            (msg) => {
                if(correlationId && correlationId == msg.properties.correlationId){
                    console.log(correlationId, msg.properties.correlationId);
                    console.log(msg.content.toString())

                }
                // console.log(msg.content.toString())
                if(msg.properties.replyTo){
                // const {content, properties} = msg;
                const result = msg.content.toString();
                // console.log(content, properties)
                console.log(`Received msg ${result}`);
                this.publish(msg.properties.replyTo,
                  Buffer.from(msg.content.toString() + ' this is example response'), {
                    correlationId: msg.properties.correlationId
                  });
                // return {content, properties};
            }},{noAck: true}
        )
}

    async acknowledge(msg) {
        this.channel.ack(msg);

    }
}