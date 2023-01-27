
export default class Product{
  _id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  category: string;

  constructor(_id: string, name: string, description: string, price: number, weight: number, category: string){
    this._id = _id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.category = category;
  }
}