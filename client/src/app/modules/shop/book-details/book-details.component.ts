import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookApiService } from 'src/app/data/services/book-api.service';
import { Book } from 'src/app/data/types/booksWithPagination';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(private bookApiService: BookApiService, private activatedRoute: ActivatedRoute, private basketService: BasketService) { }
  book: Book;

  ngOnInit(): void {
    this.loadBookDetails();
  }

  loadBookDetails() {
    const bookId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.bookApiService.getBookDetailsById(bookId).subscribe((res: Book) => {
      this.book = res;
      //console.log(this.book);
    }, error => {
      console.log(error);
    });
  }

  addBookToBasket(book: Book) {
    this.basketService.addItemToBasket(book);
  }

}
