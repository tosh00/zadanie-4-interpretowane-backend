import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Category from "../model/Category";

const createCategory = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name
    })

    return category.save()
        .then((category) => { res.status(201).json({ category }) })
        .catch((error) => { res.status(500).json({ error }) })
};
const readCategory = (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.categoryId;

    return Category.findById(categoryId)
        .then((category) => (category ? res.status(200).json({ category }) : res.status(404).json({ message: "Category not found" })))
        .catch((error) => { res.status(500).json({ error }) })
};

const readAll = (req: Request, res: Response, next: NextFunction) => {

    return Category.find()
        .then((categories) => res.status(200).json({ categories }))
        .catch((error) => { res.status(500).json({ error }) })
};

const updateCategory = (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.categoryId;

    return Category.findById(categoryId)
        .then((category) => {
            if (category) {
                category.set(req.body)
                return category.save()
                    .then((category) => { res.status(201).json({ category }) })
                    .catch((error) => { res.status(500).json({ error }) })
            }
            else {
                res.status(404).json({ message: "Category not found" })
            }
        })
        .catch((error) => { res.status(500).json({ error }) })

};
const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.categoryId;

    Category.findByIdAndDelete(categoryId)
    .then((category) => (category ? res.status(201).json({ message: 'deleted' }) : res.status(404)
    .json({ message: "Category not found" })))
    .catch((error) => { res.status(500).json({ error }) })
};

export default {createCategory, readCategory, readAll, updateCategory, deleteCategory}