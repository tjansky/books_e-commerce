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

  title: string;
  format: string;
  author: string;
  priceOfItem: number;
  imageUrl: string;

  quantity: number;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    if (this.basketItem) {
      this.priceOfItem = this.basketItem.price
      this.quantity = this.basketItem.quantity;
      this.author = "Benjamin Harmon";
      this.title = this.basketItem.title;
      this.format = "Paperback";
      this.imageUrl = this.basketItem.image;
    }
    
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
