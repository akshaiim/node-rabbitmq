const MQ = require("./amqp");


/**
 * Represents an abstract class for using different messahing service.
 * @constructor
 * @param {string} type - The type of messaging service eg: 'RabbitMq','redis' etc.
 * @param {string} queue - The queue name where the data needs to be published/consumed.
 */
module.exports = class MessagingStore {
    constructor(type, queueName) {
        this.MessagingService = ''
        if (type == process.env.MESSAGING_SERVICE_PROVIDER) {
            this.MessagingService = new MQ(queueName);
        }
    }

    async connect () {
        this.MessagingService.connect();

    }
    async disconnect (){
        this.MessagingService.disconnect()
    }
    publish(queue, msg, prop) {
        this.MessagingService.publish(queue, msg, prop)

    }
    async consume(queue, correlationId) {
        this.MessagingService.consume(queue, correlationId)
    }
    acknowledge() {
        this.MessagingService.acknowledge()
    }

}