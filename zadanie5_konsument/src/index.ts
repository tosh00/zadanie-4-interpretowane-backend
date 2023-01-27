import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import ProductConsumer from './consumers/ProductConsumer'
import CategoryConsumer from './consumers/CategoryConsumer'
import UserConsumer from './consumers/UserConsumer'
import OrderConsumer from './consumers/OrderConsumer'
import Manager from "./managers/orderManager";
import Kafka from "node-rdkafka";

mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log(config.mongo.url);

    Logging.info("Connected");
    main();
    Logging.info('End')
  })
  .catch((e) => {
    Logging.error("Unable to connect to DB: ");
    Logging.error(e);
  });

const main = () => {
  Logging.info('main started')

  // const consumer = new Kafka.KafkaConsumer({
  //   'group.id': 'kafka',
  //   'metadata.broker.list': 'localhost:9092',
  // },
  //   {});

  // consumer.connect()

  // consumer.on('ready', ()=>{
  //   Logging.info('consumer ready');
  //   consumer.subscribe(['products']);
  //   consumer.consume();
  // }).on('data', (data)=>{
  //   console.log(data.value);
    
  //   if(data.value == null) return;
    
    
  // });
  
  ProductConsumer.setup();
  CategoryConsumer.setup()
  UserConsumer.setup();
  OrderConsumer.setup();
};
