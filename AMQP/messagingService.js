const MQ = require("./amqp");

module.exports = class MessagingStore {
    constructor(type, queueName) {
        this.MessagingService = ''
        if (type == process.env.MESSAGING_SERVICE_PROVIDER) {
            this.MessagingService = new MQ(queueName);
        }
    }

    async connect () {
        await this.MessagingService.connect();

    }
    async disconnect (){
        this.MessagingService.disconnect()
    }
    publish(queue, msg) {
        this.MessagingService.publish(queue, msg)

    }
    consume(queue) {
        this.MessagingService.consume(queue)
    }
    acknowledge() {
        this.MessagingService.acknowledge()
    }

}