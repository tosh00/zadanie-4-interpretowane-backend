import categoryTests from "./categoryTests.spec";
import mongoose from 'mongoose'
import { config } from '../config/config'
import productTests from "./productTests.spec";
import userTests from "./userTests.spec";
import orderTests from "./orderTests.spec";

mongoose.connect(config.mongo.url).then( async () => {
  console.log(config.mongo.url);
  
  await callAllTests();
}).catch((e) => {


}).finally(()=>{
  // mongoose.disconnect();
});

const callAllTests = async () =>{

  await categoryTests();
  await productTests();
  await userTests();
  await orderTests();
}

