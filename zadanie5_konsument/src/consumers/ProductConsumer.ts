import Kafka from "node-rdkafka";
import ProductController from '../controllers/Product'
import Logging from "../library/Logging";
export default class ProductConsumer {
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
      consumer.subscribe(['products']);
      consumer.consume();
      Logging.info('product consumer is ready...')

    }).on('data', (data)=>{
      
      if(data.value == null) return;
      const {message, payload} = JSON.parse(data.value.toString())
      
      if(message == 'create'){
        ProductController.createProduct(payload)
      }
    }); 
  }
}
