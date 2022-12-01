import mongoose, {Document, Schema} from "mongoose";

export interface IUser{
    username: string,
    email: string,
    hashedPassword: string,
    phone: string,
    role: string
}

export interface IUserModel extends IUser, Document {};

const CategorySchema: Schema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        hashedPassword: {type: String, required: true},
        phone: {type: String, required: true},
        role: {type: String, enum: ['user', 'admin'], default: 'user'}
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IUser>('User', CategorySchema);