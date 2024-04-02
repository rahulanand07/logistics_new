const amqp = require("amqplib");


const rabbitMQ = {
  url: process.env.RABBITMQ_URL,
  exchangeName: process.env.EXCHANGE_NAME,
};

class Producer {
  channel;

  async createChannel() {
    const connection = await amqp.connect(rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingkey, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    await this.channel.assertExchange(rabbitMQ.exchangeName, "direct");

    const logDetails = {
      logType: routingkey,
      message: message,
      dateTime: new Date(),
    };
    await this.channel.publish(
      rabbitMQ.exchangeName,
      routingkey,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(`The message - ${message} is sent to exchange ${rabbitMQ.exchangeName}`)
  }
}

module.exports = Producer;
