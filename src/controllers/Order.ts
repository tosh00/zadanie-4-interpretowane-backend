import mongoose from "mongoose";
import Order from "../model/Order";
import { IProduct } from "../model/Product";
import Logger from "../library/Logging";

interface CreateOrderParams {
  products: {product: IProduct, ammount: number}[];
  userId: string;
  status?: string;
}
interface UpdateOrderParams {
  products?: {product: IProduct, ammount: number}[];
  userId?: string;
  status?: string;
}
const createOrder = async (orderParams: CreateOrderParams) => {

  const p = 
  {
    _id: new mongoose.Types.ObjectId(),
    status: "NIEZATWIERDZONE",
    date: new Date().toJSON(),
    ...orderParams,
  }
  const order = new Order(p);
  
  return await order
    .save()
    .then(() => {
      Logger.info(`Order created successfuly`);
      return order;
    })
    .catch((e) => {
      Logger.error(`Error occured while creating order`);
    });
};
const readOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);

  return order;
};

const readAll = async () => {
  return await Order.find()
    .catch((e) => {
      Logger.error(`Ups something went wrong: ${e}`);
    });
};

const updateOrder = async (orderId: string, toUpdate: UpdateOrderParams) => {
  const o =  await Order.findById(orderId)
  if(!o) return;
  o.set(toUpdate);
  const updated = await o.save()
  return updated;
};

const deleteOrder = async (orderId: string) => {
  await Order.findByIdAndDelete(orderId)
    .then(() => {
      Logger.info(`Object "${orderId}" has been deleted succesfuly.`);
    })
    .catch((error) => {
      Logger.error(`An error occured while deleting object ${error}`);
    });
};

export default { createOrder, readOrder, readAll, updateOrder, deleteOrder };
