import mongoose, {Document, Schema} from "mongoose";

export interface ICategory {
    name: string;
}

export interface ICategoryModel extends ICategory, Document {};

const CategorySchema: Schema = new Schema(
    {
        name: {type: String, required: true}
    },
    {
        versionKey: false
    }
)

export default mongoose.model<ICategoryModel>('Category', CategorySchema);