import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from 'src/app/shared/models/basket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;

  createOrUpdatePaymentIntent(basket: Basket): Observable<Basket> {
    return this.http.post<Basket>(this.apiUrl + "/Payment/CreateOrUpdatePaymentIntent", basket);
  }

}
