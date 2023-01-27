import mongoose from "mongoose";
import Category from "../model/Category";
import Logger from "../library/Logging"

const createCategory = async (categoryParams: {_id: string, name: string} ) => {

    
    const category = new Category({
        ...categoryParams,
        _id: new mongoose.Types.ObjectId(categoryParams._id)
    })

    return await category.save();
};
const readCategory = async (categoryId: string) => {
    return await Category.findById(categoryId );
};

const readAll = async () => {

    return await Category.find().catch(e=>{Logger.error(`Ups something went wrong: ${e}`)})
};

const updateCategory = async (categoryId: string, toUpdate: {name?: string}) => {


    
    const c =  await Category.findById(categoryId)
    if(!c) return;
    c.set(toUpdate);
    const updated = await c.save()
    return updated;
};
const deleteCategory = async (categoryId: string) => {

    await Category.findByIdAndDelete(categoryId)
    .then(() => {Logger.info(`Object "${categoryId}" has been deleted succesfuly.`)})
    .catch((error) => { Logger.error(`An error occured while deleting object ${error}`)})
};

export default {createCategory, readCategory, readAll, updateCategory, deleteCategory}