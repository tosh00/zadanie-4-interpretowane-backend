import mongoose, { Document, Schema } from "mongoose";

export interface IOrder {
    products: [{
        product: string,
        ammount: number
    }];
    status: string;
    name: string;
    email: string;
    phone: string;
    date: Date;
}

export interface IOrderModel extends IOrder, Document { };

const OrderSchema: Schema = new Schema(
    {
        products: [{
            product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
            ammount: { type: Number, required: true }
        }],
        status: { type: String, enum: ['NIEZATWIERDZONE', 'ZATWIERDZONE', 'ANULOWANE', 'ZREALIZOWANE'], required: true },
        email: { type: String, required: true },
        name: { type: String, required: false },
        phone: { type: String, required: false },
        date: { type: Date, required: false },

    },
    {
        versionKey: false
    }
)

export default mongoose.model<IOrderModel>('Order', OrderSchema);