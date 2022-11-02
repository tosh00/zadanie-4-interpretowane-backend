import mongoose, { Document, Schema } from "mongoose";

type PossibleOrderStatus = "CONFIRMED" | "UNCONFIRMED" | "CANCELED" | "COMPLETED";

export interface IOrder {
    date: Date;
    name: string;
    email: string;
    phone: string;
    products: [{
        product: string,
        ammount: number
    }];
    status: PossibleOrderStatus;
}

export interface IOrderModel extends IOrder, Document { };

const OrderSchema: Schema = new Schema(
    {
        products: [{
            product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
            ammount: { type: Number, required: true }
        }],
        status: { type: String, required: true },
        email: { type: String, required: true },
        name: { type: String, required: false },
        phone: { type: String, required: false },
        date: { type: String, required: false },

    },
    {
        versionKey: false
    }
)

export default mongoose.model<IOrderModel>('Order', OrderSchema);