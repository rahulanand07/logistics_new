const amqp = require('amqplib')
// const { WORKTYPE } = require('../utils/constant')
// const { Patient } = require('../modules/patients/patientModel')
// const PatientTasks = require('../modules/patients/patientTasks')
// const rabbitMqUsername = process.env.GAURA_RABBITMQ_USERNAME
// const rabbitMqPassword = process.env.GAURA_RABBITMQ_PASSWORD
// const rabbitMqUrl = process.env.RABBITMQ_URL

//Server URL from where we want to listen from
const url = `amqp://${rabbitMqUsername}:${rabbitMqPassword}@${rabbitMqUrl}/`  // Gaura Life
// const url =  'amqp://admin:admin@192.168.15.49/' // logistic server
// const url = "amqp://localhost"

//Channel name of producer where the message is coming from
const exchangeName = 'prescription_exchange'  //'logisticsExchange'
let connection = null;
let channel = null;





async function consumeMessages() {
  try {
    connection = await amqp.connect(url)
    channel = await connection.createChannel()

    await channel.assertExchange(exchangeName, "direct")

    const queue = await channel.assertQueue("prescription_queue")
    await channel.bindQueue(queue.queue, exchangeName, "prescription_queue")  ///Here prescription_queue is a routing key which have to be same as routing key from the incoming server

    console.log(`Waiting for messages in exchange - ${exchangeName}`)



    channel.consume(queue.queue, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content)
        console.log(data, '------')

        let existingPatient = await Patient.findOne({ patientId: data.patient_id })
        if (existingPatient) {
          for (let workType in data.tasks) {
            let taskObj = {
              workType: workType,
              patientId: existingPatient._id,
              task: data.tasks[workType]
            }
            let patientTask = new PatientTasks(taskObj)
            await patientTask.save()
          }
        } else {
          let patientObj = {
            patientId: data.patient_id,
            fullName: data.first_name,
            email: data.email,
            age: data.age,
            gender: data.gender,
            mobileNumber: data.mobile_number ? data.mobile_number : null,
            alternativeMobileNumber: data.alternative_mobile_number ? data.mobile_number : null,
            address: data.address ? data.address : null,
            zipcode: data.zipcode ? data.zipcode : null,
            zipcode: data.zipcode ? data.zipcode : null,
            city: data.city ? data.city : null,
            state: data.state ? data.state : null,
            country: data.country ? data.country : null,
            prescriptionType: data.prescription_type,
            paymentStatus: data.payment_status,
            priority: data.priority ? data.priority : null
          }

          let newPatient = new Patient(patientObj)
          await newPatient.save().then(async (result) => {
            console.log(result, "result-----")
            for (let workType in data.tasks) {
              let taskObj = {
                workType: workType,
                patientId: result._id,
                task: data.tasks[workType]
              }
              let patientTask = new PatientTasks(taskObj)
              await patientTask.save()
            }
          }).catch((err) => {
            console.log(err)
          })
        }

        channel.ack(msg) //message acknowledge
      } else {
        console.log('Consumer cancelled by server');
      }
    })


    connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err.message);
      reconnect();
    });

    connection.on('close', () => {
      console.log('RabbitMQ connection closed');
      reconnect();
    });


  } catch (error) {
    console.error('error:', error);
    // Retry the connection after a delay 
    reconnect()
  }
}


const reconnect = async () => {
  if (connection) {
    try {
      await connection.close();
    } catch (err) {
      console.error('Error closing RabbitMQ connection:', err.message);
    }
  }
  connection = null;
  channel = null;

  try {
    const isOnline = await import('is-online');
    const online = await isOnline.default();
    if (online) {
      console.log('Internet is back up. Reconnecting to RabbitMQ...');
      consumeMessages();
    } else {
      console.log('Internet is still down. Waiting for connection...');
    }
  } catch (err) {
    console.error('Error checking internet status:', err.message);
  }
};

// Check internet status 
setInterval(async () => {
  try {
    const isOnline = await import('is-online');
    const online = await isOnline.default();
    //   console.log(online,"---11")
    if (!online && connection !== null) {
      console.log('Internet connection lost. Closing RabbitMQ connection...');
      reconnect();
    }
    //   if(online &&connection == null){
    //     reconnect()
    //   }
  } catch (err) {
    console.error('Error checking internet status:', err.message);
  }
}, 5000); // Check every 5 seconds



module.exports = consumeMessages
