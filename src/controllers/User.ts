import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  })
    .select("-_id")
    .lean();

  // console.log(user);

  if (!user) {
    return res.status(401).json({
      error: "Wrong email or username",
    });
  }

  if (await bcrypt.compare(password, user.hashedPassword)) {
    const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN;
    const refreshTokenSecret: string | undefined = process.env.REFRESH_TOKEN;
    if (!accessTokenSecret || !refreshTokenSecret) {
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
    console.log({ ...user });

    const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: "2m" });
    const refreshToken = jwt.sign(user, refreshTokenSecret);

    setUserRefreshToken(user._id, refreshToken, res)

    return res.status(200).json({ user, accessToken, refreshTokenSecret });
  } else {
    return res.status(401).json({
      error: "Wrong password",
    });
  }
};

const getUserToken = (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.params.token;
  const userId = req.params.userId;
  if(refreshToken === null ) return res.sendStatus(401)
  User.findById(userId).then((user) => {
    if (user) {
      const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN;
      const refreshTokenSecret: string | undefined = process.env.REFRESH_TOKEN;
      if (!accessTokenSecret || !refreshTokenSecret) {
        return res.status(500).json({
          error: "Something went wrong",
        });
      }
      jwt.verify(refreshToken, refreshTokenSecret, (err, user: any)=>{
        if(err) return res.sendStatus(403)
        const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: "2m" });
        return res.json({accessToken})
      })
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
}

const setUserRefreshToken = (userId: mongoose.Types.ObjectId, token: string | null, res: Response)=>{

  User.findById(userId).then((user) => {
    if (user) {
      user.set({ token });
      return user
        .save()
        .catch((error) => {
          res.status(500).json({ error });
        });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
}

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.user;
  if(!user) return res.sendStatus(403);
  setUserRefreshToken(user._id as mongoose.Types.ObjectId, null, res);
  res.sendStatus(204)
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, phone } = req.body;

  //"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

  //   if(!password.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"))

  console.log({ username, email, password, phone });
  
  const passwordTest = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
  );
  if (!passwordTest.test(password)) {
    console.log(password);

    return res.status(400).json({
      error:
        "Password must have at least 8 characters, include lower and upper case letters and number.",
    });
  }

  console.log(password);

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
        req.body.role == "user";
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

export default {
  createUser,
  readUser,
  readAll,
  updateUser,
  deleteUser,
  loginUser,
  getUserToken,
  logoutUser,
};
