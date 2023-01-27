import Kafka from "node-rdkafka";
import OrderController from '../controllers/Order'
import Logging from "../library/Logging";
export default class OrderConsumer {
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
      consumer.subscribe(['orders']);
      consumer.consume();
      Logging.info('order consumer is ready...')
    }).on('data', (data)=>{
      
      if(data.value == null) return;
      const {message, payload} = JSON.parse(data.value.toString())
      
      if(message == 'create'){
        Logging.info(`creating order ${payload.name}`)
        OrderController.createOrder(payload)
      }
    }); 
  }
}
