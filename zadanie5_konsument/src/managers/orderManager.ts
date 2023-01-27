import { number } from 'joi';
import { Types } from 'mongoose';
import categoryController from '../controllers/Category'
import orderController from '../controllers/Order'
import productController from '../controllers/Product'
import userController from '../controllers/User'
import { IOrder } from '../model/Order';
import { IProduct } from '../model/Product';
import { IUser } from '../model/User';

interface CreateOrderParams {
  products: {product: IProduct, ammount: number}[];
  userId: string;
  status?: string;
}

export default class Manager{


  constructor(){
    categoryController.readAll();
    productController.readAll();
    userController.readAll();
    orderController.readAll();
  }

  createCategory = categoryController.createCategory;
  readCategory = categoryController.readCategory
  readAllCategories = categoryController.readAll
  updateCategory = categoryController.updateCategory;
  deleteCategory = categoryController.deleteCategory;
  
  createUser = userController.createUser;
  readUser = userController.readUser;
  readAllUsers = userController.readAll;
  updateUser = userController.updateUser;
  deleteUser = userController.deleteUser;
  
  createProduct = productController.createProduct;
  readProduct = productController.readProduct;
  readAllProducts = productController.readAll;
  updateProduct = productController.updateProduct;
  deleteProduct = productController.deleteProduct;


  createOrder = async (orderParams: CreateOrderParams) =>{
    const user = await userController.readUser(orderParams.userId);
    if(user && user.type != 'blocked'){
      const o = await orderController.createOrder(orderParams)
      return o;
    }
  }
  readOrder = orderController.readOrder; 
  readAllOrders = orderController.readAll; 
  updateOrder = orderController.updateOrder; 
  deleteOrder = orderController.deleteOrder;

  getTotalPrice = async (orderId: string) =>{
      const order: IOrder & {_id: Types.ObjectId;} | null = await orderController.readOrder(orderId);
      if(!order) return 0;

      const user = await userController.readUser(order?.userId);

      let sumPrice = 0;
      let sumWeight = 0;
      let deliveryCost

      order.products.forEach((p)=>{
        sumPrice += (p.product.price * p.ammount);
        sumWeight += (p.product.weight * p.ammount);
      })

      if(sumWeight < 50){
        deliveryCost = 10;
      }else if(sumWeight < 100){
        deliveryCost = 20;
      }else {
        deliveryCost = 30;
      }

      

      if(user?.type == 'vip'){
        return sumPrice * .9;
      }else{
        return sumPrice + deliveryCost;
      }
  }






}