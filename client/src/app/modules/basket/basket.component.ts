import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Basket, Item } from 'src/app/shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket$: Observable<Basket>;
  basketTotal$: Observable<number>;

  constructor(private basketService: BasketService, private router: Router) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketTotal$ = this.basketService.basketTotal$;
  }

  // removeBasketItem(item: Item) {
  //   this.basketService.removeItemFromBasket(item);
  // }

  // incrementItemQuantity(item: Item) {
  //   this.basketService.incrementItemQuantity(item);
  // }

  // decrementItemQuantity(item: Item) {
  //   this.basketService.decrementItemQuantity(item);
  // }

  onCheckoutClick() {
    this.router.navigateByUrl("/checkout");
  }
  
}
