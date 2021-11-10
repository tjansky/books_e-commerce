import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrder } from 'src/app/shared/models/createOrder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;

  addOrder(order: CreateOrder) {
    return this.http.post(this.apiUrl + "/Order/CreateOrder", order);
  }
}
