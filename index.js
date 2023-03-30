const amqp = require('amqplib')
require('dotenv').config()

const hostname = process.env.HOST || 'localhost'
const protocol = process.env.PROTOCOL
const username = process.env.USERNAME
const password = process.env.PASSWORD
const queue = process.env.QUEUE

const rabbitSettings = {
    protocol: protocol,
    hostname: hostname,
    username: username,
    password: password,
    vhost: '/'
}
async function connect() {
    try {
        const conn = await amqp.connect(rabbitSettings)
        console.log("*Conectado*")

        const channel = await conn.createChannel();

        channel.sendToQueue(queue, Buffer.from("El mensaje"))


    }
    catch (error){
        console.log('Erro =>', error)
    }
}

connect()
