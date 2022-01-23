import { Component, OnInit } from '@angular/core';
import { BookApiService } from 'src/app/data/services/book-api.service';
import { Book } from 'src/app/data/types/booksWithPagination';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private bookApiService: BookApiService, private basketService: BasketService) { }
  wishlistBooks: Book[] = [];

  ngOnInit(): void {
    this.loadWishlistBooks();
  }

  loadWishlistBooks() {
    this.bookApiService.getUserWishlist().subscribe(res => {
      // console.log(res);
      this.wishlistBooks = res;
    }, error => {
      console.log(error);
    });
  }

  onRemoveBook(bookId: number) {
    this.bookApiService.removeBookFromWishlist(bookId).subscribe(res => {
      // book was removed from wishlist
      this.loadWishlistBooks();
    }, error => {
      console.log();
    });
  }

  onAddInBasket(book: Book) {
    this.basketService.addItemToBasket(book);
  }

  

}
