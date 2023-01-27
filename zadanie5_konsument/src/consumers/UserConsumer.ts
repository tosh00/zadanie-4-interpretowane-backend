import Kafka from "node-rdkafka";
import UserController from '../controllers/User'
import Logging from "../library/Logging";
export default class UserConsumer {
  static setup() {

    const consumer = new Kafka.KafkaConsumer(
      {
        "group.id": "kafka",
        "metadata.broker.list": "localhost:9092",
      },
      {}
    );
    consumer.connect()
    consumer.on('ready', ()=>{
      consumer.subscribe(['users']);
      consumer.consume();
      Logging.info('user consumer is ready...')
    }).on('data', (data)=>{
      
      if(data.value == null) return;
      const {message, payload} = JSON.parse(data.value.toString())
      
      if(message == 'create'){
        Logging.info(`creating user ${payload.name}`)
        UserController.createUser(payload)
      }
    }); 
  }
}
