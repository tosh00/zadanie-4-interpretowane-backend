import mongoose, {Document, Schema} from "mongoose";

export interface IProduct {
    name: string;
    description: string;
    price: number;
    weight: number;
    category: string;
}

export interface IProductModel extends IProduct, Document {};

const ProductSchema: Schema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        weight: {type: Number, required: true},
        category: {type: Schema.Types.ObjectId, required: true, ref: 'Category'}
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IProductModel>('Product', ProductSchema);