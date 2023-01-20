import mongoose from 'mongoose'
import { config } from './config/config'
import Logging from './library/Logging'
import Manager from './managers/orderManager';


mongoose.connect(config.mongo.url).then(() => {
  console.log(config.mongo.url);
  
  Logging.info("Connected")
  main();
}).catch((e) => {
  Logging.error("Unable to connect to DB: ")
  Logging.error(e)

});


const main = async () => {
  const m = new Manager();
}
