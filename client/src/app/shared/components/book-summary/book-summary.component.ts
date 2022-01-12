import { Component, Input, OnInit } from '@angular/core';
import { title } from 'process';
import { BasketService } from 'src/app/modules/basket/basket.service';
import { Item } from '../../models/basket';

@Component({
  selector: 'app-book-summary',
  templateUrl: './book-summary.component.html',
  styleUrls: ['./book-summary.component.css']
})
export class BookSummaryComponent implements OnInit {
  //@Input() isBasketElement = false;
  @Input() basketItem: Item = null;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  // basket methods
  removeBasketItem() {
    this.basketService.removeItemFromBasket(this.basketItem);
  }

  incrementItemQuantity() {
    this.basketService.incrementItemQuantity(this.basketItem);
  }

  decrementItemQuantity() {
    this.basketService.decrementItemQuantity(this.basketItem);
  }

}
