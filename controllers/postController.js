const publishMessage = require('../AMQP/publishMessage')
const receiveMessage = require('../AMQP/receiveMessage')


const addPosts = async (req,res) => {
    try{
    let { queueName, payload } = req.body;
    // publish messages to the input queue
    await publishMessage(queueName, payload)
    // to see publishedMessage
    // await receiveMessage(queueName)

    res.status(200).send({message : 'Success'})
    }
    catch(err){
        console.error(err)
        res.status(500).send(err.message)
    }
}


module.exports = {addPosts}