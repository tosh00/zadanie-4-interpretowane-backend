import mongoose from "mongoose";
import Logger from "../library/Logging";
import Product from "../model/Product";

const createProduct = async (productParams: {
  name: string;
  description: string;
  price: number;
  weight: number;
  category: string;
}) => {
  const { name, description, price, weight, category } = productParams;

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    description,
    price,
    weight,
    category,
  });

  return await product.save();
};
const readProduct = async (productId: string) => {
  const p = await Product.findById(productId)
    .populate("category")
    .catch((e) => {
      Logger.error(`Can't get product from database: ${e}`);
    });
  return p?.toObject();
};

const readAll = async () => {
  return await Product.find()
    .populate("category")
    .catch((e) => {
      Logger.error(`Ups something went wrong: ${e}`);
    });
};

const updateProduct = async (
  productId: string,
  toUpdate: {
    name?: string;
    description?: string;
    price?: number;
    weight?: number;
    category?: string;
  }
) => {
  const p = await Product.findById(productId);
  if (!p) return;
  p.set(toUpdate);
  const updated = await p.save();
  return updated;
};
const deleteProduct = async (productId: string) => {
  await Product.findByIdAndDelete(productId)
    .then(() => {
      Logger.info(`Object "${productId}" has been deleted succesfuly.`);
    })
    .catch((error) => {
      Logger.error(`An error occured while deleting object ${error}`);
    });
};

export default {
  createProduct,
  readProduct,
  readAll,
  updateProduct,
  deleteProduct,
};
