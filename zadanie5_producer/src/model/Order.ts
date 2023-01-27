import Product from "./Product";

type ProductList = 
  {
    product: Product,
    ammount: number
  }[]


type OrderStatus = 'NIEZATWIERDZONE' | 'ZATWIERDZONE' | 'ANULOWANE' | 'ZREALIZOWANE'

export default class Order {
  _id: string;
  products: ProductList;
  status: OrderStatus;
  date: Date;
  userId: string;

  constructor(_id: string, products: ProductList, status: OrderStatus, date: Date, userId: string){
    this._id = _id;
    this.products = products;
    this.status = status;
    this.date = date;
    this.userId = userId;
  }

}