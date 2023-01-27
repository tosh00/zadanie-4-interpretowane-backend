import Kafka from "node-rdkafka";
import CategoryController from '../controllers/Category'
import Logging from "../library/Logging";
export default class CategoryConsumer {
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
      consumer.subscribe(['categories']);
      consumer.consume();
      Logging.info('category consumer is ready...')
    }).on('data', (data)=>{
      
      if(data.value == null) return;
      const {message, payload} = JSON.parse(data.value.toString())
      
      if(message == 'create'){
        Logging.info(`creating category ${payload.name}`)
        CategoryController.createCategory(payload)
      }
    }); 
  }
}
