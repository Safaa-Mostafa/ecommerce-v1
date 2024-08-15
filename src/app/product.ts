import { Order } from "./order";

export interface Product {
  id:number,
  name:string,
  priceAfterDiscount: number,
  priceBeforeDiscount:number,
  discount:number,
  quantity:number,
  availableInStock:number,
  categoryId:number,
  img:string,
  rating:number,
  description:string,
  created:Date
}
