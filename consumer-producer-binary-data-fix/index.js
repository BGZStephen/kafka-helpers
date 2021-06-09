const { Kafka } = require('kafkajs')
const fs = require('fs')

async function main() {
  const clientId = ""
  const brokers = [""]
  const topic = "";
  const groupId = ""

  const kafka = new Kafka({
    clientId,
    brokers,
    ssl: {
      rejectUnauthorized: false,
      ca: [fs.readFileSync('./ca.pem', 'utf-8')],
      key: fs.readFileSync('./service.key', 'utf-8'),
      cert: fs.readFileSync('./service.cert', 'utf-8')
    },
  })

  const consumer = kafka.consumer({ groupId })
  const producer = kafka.producer()

  await consumer.connect()
  await producer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (/[\x00-\x1F]/.test(message.key?.toString()) && message.value) {
        await producer.send({
          topic,
          messages: [
              { key: message.key.toString(), value: null, partition },
          ],
        }) 
      }
    },
  })

  consumer.seek({ topic, partition: 2, offset: 0 })
}

main()