
type userType = 'regular' | 'vip' | 'blocked';

export default class User{
  _id: string;
  username: string;
  email: string;
  phone: string;
  type: userType;

  constructor(_id: string, username: string, email: string, phone: string, type: userType){
    this._id = _id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.type = type;
  }
}