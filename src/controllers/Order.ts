import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Order from '../model/Order';

const createOrder = (req: Request, res: Response, next: NextFunction) => {
    const { products, name, email, phone, status = 'NIEZATWIERDZONE', date = new Date().toJSON() } = req.body;

    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        date,
        name,
        email,
        phone,
        products,
        status
    })

    return order.save()
        .then((order) => { res.status(201).json({ order }) })
        .catch((error) => { res.status(500).json({ error }) })
};
const readOrder = (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    return Order.findById(orderId)
        .populate({ path: 'products' })
        .then((order) => (order ? res.status(200).json({ order }) : res.status(404).json({ message: 'Order not found' })))
        .catch((error) => { res.status(500).json({ error }) })
};

const readAll = (req: Request, res: Response, next: NextFunction) => {

    return Order.find()
        .populate({ path: 'products.product', populate: { path: 'category' } })
        .then((order) => res.status(200).json({ order }))
        .catch((error) => { res.status(500).json({ error }) })
};

const updateOrder = (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    return Order.findById(orderId)
        .then((order) => {
            if (order) {
                order.set(req.body)
                return order.save()
                    .then((order) => { res.status(201).json({ order }) })
                    .catch((error) => { res.status(500).json({ error }) })
            }
            else {
                res.status(404).json({ message: 'Order not found' })
            }
        })
        .catch((error) => { res.status(500).json({ error }) })

};
const deleteOrder = (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    Order.findByIdAndDelete(orderId)
        .then((order) => (order ? res.status(201).json({ message: 'deleted' }) : res.status(404)
            .json({ message: 'Order not found' })))
        .catch((error) => { res.status(500).json({ error }) })
};

export default { createOrder, readOrder, readAll, updateOrder, deleteOrder }