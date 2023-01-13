import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { identifier, password } = req.body;

    const user = await User.findOne({$or: [{username: identifier}, {email: identifier}]}).select("-_id").lean();

    // console.log(user);
    
    if(!user){
      
      return res
      .status(401)
      .json({
        error:
          "Wrong email or username",
      });
    }


    if(await bcrypt.compare(password, user.hashedPassword)){
      const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN;
      if(!accessTokenSecret){
        return res
        .status(500)
        .json({
          error:
            "Something went wrong",
        });
      }
      
      const accessToken = jwt.sign(user, accessTokenSecret);
      
      return res.status(200).json({ user, accessToken});
      
    }else {
      return res
      .status(401)
      .json({
        error:
          "Wrong password",
      });
    }


};

const getLoggedUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log(!!req.body.user);
  
  if(!req.body.user){
    return res.status(500).json({error: "Server couldn't resolve this request."});
  }
  const user = await User.findOne({username: req.body.user.username}).select("-_id").lean();

  return res.status(200).json({user});
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, phone } = req.body;

  //"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

  //   if(!password.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"))

  const passwordTest = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
  );
  if (!passwordTest.test(password)) {

    return res
      .status(400)
      .json({
        error:
          "Password must have at least 8 characters, include lower and upper case letters and number.",
      });
  }


  let hashedPassword: string = await bcrypt.hash(password, 10);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    hashedPassword,
    phone,
  });

  return user
    .save()
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "User not found" })
    )
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .then((user) => res.status(200).json({ user }))
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);
        req.body.role == 'user'
        return user
          .save()
          .then((user) => {
            res.status(201).json({ user });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(201).json({ message: "deleted" })
        : res.status(404).json({ message: "User not found" })
    )
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export default { createUser, readUser, readAll, updateUser, deleteUser, loginUser, getLoggedUser};
