import mongoose, { Document, Schema } from "mongoose";
import Product, { IProduct } from "./Product";

export interface IOrder {
    products: [{
        product: IProduct,
        ammount: number
    }];
    status: string;
    date: Date;
    userId: string;
}

export interface IOrderModel extends IOrder, Document { };

const OrderSchema: Schema = new Schema(
    {
        products: [{
            product: { 
                name: {type: String},
                description: {type: String},
                price: {type: Number},
                weight: {type: Number},
                category: {type: Schema.Types.ObjectId, required: true, ref: 'Category'}
            },
            ammount: { type: Number, required: true }
        }],
        status: { type: String, enum: ['NIEZATWIERDZONE', 'ZATWIERDZONE', 'ANULOWANE', 'ZREALIZOWANE'], required: true },
        date: { type: Date, required: false },
        userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'}

    },
    {
        versionKey: false
    }
)

export default mongoose.model<IOrderModel>('Order', OrderSchema);