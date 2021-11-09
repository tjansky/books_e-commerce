import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentApiService } from 'src/app/data/services/payment-api.service';
import { Basket } from 'src/app/shared/models/basket';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  basket: Basket;
  basketTotal$: Observable<number>;

  constructor(private paymentApiService: PaymentApiService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketService.basket$.subscribe(res => this.basket = res);

    this.basketTotal$ = this.basketService.basketTotal$;
  }

  onContinueToPayment() {
    this.paymentApiService.createOrUpdatePaymentIntent(this.basket).subscribe((res: Basket) => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

}
