import assert from "assert";
import { randomUUID } from "crypto";
import OrderManager from "../managers/orderManager";
import TestLogging from "./utils/TestLogger";
const m: OrderManager = new OrderManager();
const logger = new TestLogging("User Tests");

const randomString: string = randomUUID().toString();
const randomString2: string = randomUUID().toString();
let userId: string;
let categoryId: string; 
const createUserTest = async () => {
categoryId = await (await m.createCategory(randomString) as {_id: string})._id.toString() as string;
  
  const created = await m.createUser({username: randomString, email: randomString, phone: randomString});

  if (created) {
    userId = created._id?.toString() as string;
    const found = await m
      .readUser(userId)
      .then((r) => {
        logger.succes("createUserTest");
        return;
      })
      .catch((e) => logger.error(e));
  } else {
    logger.error("createUserTest");
  }
};

const updateUserTest = async () => {
  try {
    const updated1 = await m.updateUser(userId, {username: randomString2, email: randomString2, phone: randomString2});
    const updated = await m.readUser(userId);
    

    if (updated)
      if (updated?.username === randomString2) {
        logger.succes("updateUserTest");
      } else {
        logger.error("updateUserTest");
      }
  } catch {
    logger.error("updateUserTest");
  }
};

const deleteUserTest = async () => {
  try {
    await m.deleteUser(userId);
    const getDeleted = await m.readUser(userId);
    if (!getDeleted) {
      logger.succes("deleteUserTest");
    } else {
      logger.error("deleteUserTest2");
    }
  } catch {
    logger.error("deleteUserTest");
  }

  //cleanup
  
  m.deleteCategory(categoryId)
};

const userTests = async () => {
  await createUserTest();
  await updateUserTest();
  await deleteUserTest(); 
};

export default userTests;
