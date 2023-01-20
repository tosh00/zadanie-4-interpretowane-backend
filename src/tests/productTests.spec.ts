import assert from "assert";
import { randomUUID } from "crypto";
import OrderManager from "../managers/orderManager";
import TestLogging from "./utils/TestLogger";
const m: OrderManager = new OrderManager();
const logger = new TestLogging("Product Tests");

const randomString: string = randomUUID().toString();
const randomString2: string = randomUUID().toString();
let productId: string;
let categoryId: string; 
const createProductTest = async () => {
categoryId = await (await m.createCategory(randomString) as {_id: string})._id.toString() as string;
  
  const created = await m.createProduct({name: randomString, description: randomString, price: Math.random()*100, weight: Math.random()*100, category: categoryId});

  if (created) {
    productId = created._id?.toString() as string;
    const found = await m
      .readProduct(productId)
      .then((r) => {
        logger.succes("createProductTest");
        return;
      })
      .catch((e) => logger.error(e));
  } else {
    logger.error("createProductTest");
  }
};

const updateProductTest = async () => {
  try {
    const updated1 = await m.updateProduct(productId, {
      name: randomString2,
    });
    const updated = await m.readProduct(productId);
    

    if (updated)
      if (updated?.name === randomString2) {
        logger.succes("updateProductTest");
      } else {
        logger.error("updateProductTest");
      }
  } catch {
    logger.error("updateProductTest");
  }
};

const deleteProductTest = async () => {
  try {
    await m.deleteProduct(productId);
    const getDeleted = await m.readProduct(productId);
    if (!getDeleted) {
      logger.succes("deleteProductTest");
    } else {
      logger.error("deleteProductTest2");
    }
  } catch {
    logger.error("deleteProductTest");
  }

  //cleanup
  
  m.deleteCategory(categoryId)
};

const productTests = async () => {
  await createProductTest();
  await updateProductTest();
  await deleteProductTest(); 
};

export default productTests;
