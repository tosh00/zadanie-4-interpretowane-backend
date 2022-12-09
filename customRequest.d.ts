
interface IUser{
  _id: any,
  username: string,
  email: string,
  hashedPassword: string,
  phone: string,
  role: string
}

declare namespace Express {
  export interface Request {
     user?: IUser;
  }
}