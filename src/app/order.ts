import { Product } from "./product";

export interface Order {
  id:string,
    productId:number,
    categoryId:number,
    totalPrice:number,
    userId:string,
    quantity:number,
    productImage:string,
    productName:string
}
