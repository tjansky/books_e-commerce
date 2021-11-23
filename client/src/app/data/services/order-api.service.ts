import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrder } from 'src/app/shared/models/createOrder';
import { environment } from 'src/environments/environment';
import { Order } from '../types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;

  addOrder(order: CreateOrder) {
    return this.http.post<Order>(this.apiUrl + "/Order/CreateOrder", order);
  }

  setOrderStatusToSuccessful(orderId: number) {
    return this.http.put(this.apiUrl + "/Order/UpdateOrderStatus/" + orderId, null);
  }

  getOrderById(orderId: number) {
    return this.http.get<Order>(this.apiUrl + '/Order/GetOrderById/' + orderId);
  }

  getAllUserOrders() {
    return this.http.get<Order[]>(this.apiUrl + '/Order/GetAllUserOrders');
  }

}
