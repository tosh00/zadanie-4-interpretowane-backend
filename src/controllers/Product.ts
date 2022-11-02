import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Product from '../model/Product';

const createProduct = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, weight, category } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        price,
        weight,
        category
    })

    return product.save()
        .then((product) => { res.status(201).json({ product }) })
        .catch((error) => { res.status(500).json({ error }) })
};
const readProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findById(productId)
        .then((product) => (product ? res.status(200).json({ product }) : res.status(404).json({ message: 'Product not found' })))
        .catch((error) => { res.status(500).json({ error }) })
};

const readAll = (req: Request, res: Response, next: NextFunction) => {

    return Product.find()
        .then((product) => res.status(200).json({ product }))
        .catch((error) => { res.status(500).json({ error }) })
};

const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findById(productId)
        .then((product) => {
            if (product) {
                product.set(req.body)
                return product.save()
                    .then((product) => { res.status(201).json({ product }) })
                    .catch((error) => { res.status(500).json({ error }) })
            }
            else {
                res.status(404).json({ message: 'Product not found' })
            }
        })
        .catch((error) => { res.status(500).json({ error }) })

};
const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    Product.findByIdAndDelete(productId)
    .then((product) => (product ? res.status(201).json({ message: 'deleted' }) : res.status(404)
    .json({ message: 'Product not found' })))
    .catch((error) => { res.status(500).json({ error }) })
};

export default {createProduct, readProduct, readAll, updateProduct, deleteProduct}