import assert from "assert";
import { randomUUID } from "crypto";
import OrderManager from "../managers/orderManager";
import TestLogging from "./utils/TestLogger";
const m: OrderManager = new OrderManager();
const logger = new TestLogging("Category Tests");

const randomString: string = randomUUID().toString();
const randomString2: string = randomUUID().toString();
let categoryId: string;

const createCategoryTest = async () => {
  const created = await m.createCategory(randomString);

  if (created) {
    categoryId = created._id?.toString() as string;
    const found = await m
      .readCategory(categoryId)
      .then((r) => {
        logger.succes("createCategoryTest");
        return;
      })
      .catch((e) => logger.error(e));
  } else {
    logger.error("createCategoryTest");
  }
};

const updateCategoryTest = async () => {
  try {
    const updated1 = await m.updateCategory(categoryId, {
      name: randomString2,
    });
    const updated = await m.readCategory(categoryId);

    if (updated)
      if (updated?.name === randomString2) {
        logger.succes("updateCategoryTest");
      } else {
        logger.error("updateCategoryTest");
      }
  } catch {
    logger.error("updateCategoryTest");
  }
};

const deleteCategoryTest = async () => {
  try {
    await m.deleteCategory(categoryId);
    const getDeleted = await m.readCategory(categoryId);
    if (!getDeleted) {
      logger.succes("deleteCategoryTest");
    } else {
      logger.error("deleteCategoryTest2");
    }
  } catch {
    logger.error("deleteCategoryTest");
  }
};

const categoryTests = async () => {
  await createCategoryTest();
  await updateCategoryTest();
  await deleteCategoryTest(); 
};

export default categoryTests;
