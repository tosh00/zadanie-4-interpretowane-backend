import mongoose, {Document, Schema} from "mongoose";

export interface IUser{
    username: string,
    email: string,
    phone: string,
    type: string
}

export interface IUserModel extends IUser, Document {};

const CategorySchema: Schema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        phone: {type: String, required: true},
        type: {type: String, enum: ['regular', 'vip', 'blocked'], default: 'regular'}
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IUser>('User', CategorySchema);