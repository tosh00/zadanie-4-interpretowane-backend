import assert from "assert";
import { randomUUID } from "crypto";
import { Types } from "mongoose";
import OrderManager from "../managers/orderManager";
import { IProduct, IProductModel } from "../model/Product";
import TestLogging from "./utils/TestLogger";
const m: OrderManager = new OrderManager();
const logger = new TestLogging("Order Tests");

const randomString: string = randomUUID().toString();
const randomString2: string = randomUUID().toString();
let orderId: string;
let categoryId: string;
let userId: string;

interface CreateOrderParams {
  products: {product: IProduct, ammount: number}[];
  userId: string;
  status?: string;
}

let testProduct: IProductModel & {
  _id: Types.ObjectId;
};
let testProduct2: IProductModel & {
  _id: Types.ObjectId;
};

const createOrderTest = async () => {
  categoryId = (await (
    await m.createCategory(randomString)
  )._id.toString()) as string;
  userId = (await (
    await m.createUser({
      username: randomString2,
      email: randomString2,
      phone: randomString2,
    })
  )._id.toString()) as string;
  testProduct = await m.createProduct({
    name: randomString,
    description: randomString,
    price: 3,
    weight: 2,
    category: categoryId,
  });
  testProduct2 = await m.createProduct({
    name: randomString2,
    description: randomString2,
    price: 2,
    weight: 3,
    category: categoryId,
  });

  const params: CreateOrderParams = {
    products: [
      {
        product: {
          ...testProduct,
        },
        ammount: 10
      },
      {
        product: {
          ...testProduct2,
        },
        ammount: 11
      },
    ],
    userId: userId

  };

  const created = await m.createOrder(params);

  if (created) {
    orderId = created._id?.toString() as string;
    const found = await m
      .readOrder(orderId)
      .then((r) => {
        logger.succes("createOrderTest");
        return;
      })
      .catch((e) => logger.error(e));
  } else {
    logger.error("createOrderTest");
  }
};

const updateOrderTest = async () => {
  try {
    const updated1 = await m.updateOrder(orderId, {
      products: [
        {
          product: {
            ...testProduct,
          },
          ammount: 1
        },
        {
          product: {
            ...testProduct2,
          },
          ammount: 30
        },
      ]
  
    });
    const updated = await m.readOrder(orderId);

    if (updated)
      if (updated?.products[0].ammount === 1) {
        logger.succes("updateOrderTest");
      } else {
        logger.error("updateOrderTest");
      }
  } catch {
    logger.error("updateOrderTest");
  }
};

const totalPriceOfOrder = async () => {
  const price = await m.getTotalPrice(orderId);
  
  if(price === 83){
    logger.succes("totalPriceOrderTest");
  }else{
    logger.error("totalPriceOrderTest");
  }
}


const deleteOrderTest = async () => {
  try {
    await m.deleteOrder(orderId);
    const getDeleted = await m.readOrder(orderId);
    if (!getDeleted) {
      logger.succes("deleteOrderTest");
    } else {
      logger.error("deleteOrderTest2");
    }
  } catch {
    logger.error("deleteOrderTest");
  }

  //cleanup

  m.deleteCategory(categoryId);
};

const orderTests = async () => {
  await createOrderTest();
  await updateOrderTest();
  await totalPriceOfOrder();
  await deleteOrderTest();
};

export default orderTests;
