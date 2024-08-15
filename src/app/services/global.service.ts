import { Order } from './../order';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';
import { Category } from './../category';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import Cookies from 'js-cookie'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
pathUrl:string = "http://localhost:3000";
order:Order[]=[];
products!:Product[];
isLoggedIn!:boolean;
userId!:string;
constructor(private http:HttpClient){
  this.userId =  Cookies.get("userId") || ""
  Cookies.get('userId')?this.isLoggedIn =true:this.isLoggedIn=false;
}
editUser(user: any,Id:string): Observable<any> {
  return this.http.patch(`http://localhost:3000/user/${Id}`, user);
}
getUser(id:string):Observable<User>{
  return this.http.get<User>(`${this.pathUrl}/user`);
}

addUser(obj:User):Observable<User>{
return this.http.post<User>(`${this.pathUrl}/user`,obj);
}
 getItems():Observable<Product[]>{
  return this.http.get<Product[]>(`${this.pathUrl}/items`)
}

getCategories():Observable<Category[]>{
  return this.http.get<Category[]>(`${this.pathUrl}/categories`)
}
getProductsByCategoryId(id: number): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.pathUrl}/items?categoryId=${id}`);
}
getUserOrders(id:string): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.pathUrl}/order?userId=${id}`);
}

addOrder(obj:any):Observable<Order>{
  return this.http.post<Order>(`${this.pathUrl}/order`,obj);
}
editOrder(obj:any,id:string):Observable<Order>{
  return this.http.put<Order>(`${this.pathUrl}/order/${id}`,obj);
}
getAllOrders():Observable<Order[]>{
  return this.http.get<Order[]>(`${this.pathUrl}/order`);
}
getProduct(id:number):Observable<Product>{
  return this.http.get<Product>(`${this.pathUrl}/items/${id}`)
}
getAllUsers():Observable<User[]>{
  return this.http.get<User[]>(`${this.pathUrl}/user`);
}

deleteOrder(or:Order):Observable<Order>{
  return this.http.delete<Order>(`${this.pathUrl}/order/${or.id}`);
}
deleteAllOrders(orders:Order):Observable<Order[]>{
  return this.http.delete<Order[]>(`${this.pathUrl}/order/`)
}
}

