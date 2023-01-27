import mongoose from "mongoose";
import User from "../model/User";
import * as dotenv from "dotenv";
import Logger from "../library/Logging";


dotenv.config();


const createUser = async (userProps: {_id: string, username: string, email: string, phone: string }) => {

  //"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

  //   if(!password.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"))=


  const user = new User({
    ...userProps,
    _id: new mongoose.Types.ObjectId(userProps._id)
  });

  const newUser = await user.save();


  return newUser;
};
const readUser = async (userID: string) => {
  return await User.findById(userID);

};

const readAll = async () => {
  return await User.find()
    .catch((e) => {
      Logger.error(`Ups something went wrong: ${e}`);
    });
};

const updateUser = async (userId: string, toUpdate: {username?: string, email?: string, phone?: string, type?: 'regular' | 'vip'}) => {
  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(toUpdate);
        return user
          .save()
          .then((user) => {
            Logger.info("Objest has been updated");
          })
          .catch((error) => {
          });
      } else {
        Logger.error("Object with that id does not exist");
        return null;
      }
    })
    .catch((error) => {
      Logger.error(`An error occured while updating object ${error}`);
    });
};
const deleteUser = async (userId: string) => {

  await User.findByIdAndDelete(userId)
    .then((user) => {
      Logger.info(`Object "${userId}" has been deleted succesfuly.`);
    }
    )
    .catch((error) => {
      Logger.error(`An error occured while deleting object ${error}`);
    });
};

export default { createUser, readUser, readAll, updateUser, deleteUser};
