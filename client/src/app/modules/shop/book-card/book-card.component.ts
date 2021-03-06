import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/data/types/booksWithPagination';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  onAddInBasket(book: Book) {
    this.basketService.addItemToBasket(book);
  }

}
