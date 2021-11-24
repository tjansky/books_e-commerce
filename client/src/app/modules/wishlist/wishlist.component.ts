import { Component, OnInit } from '@angular/core';
import { BookApiService } from 'src/app/data/services/book-api.service';
import { Book } from 'src/app/data/types/booksWithPagination';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private bookApiService: BookApiService) { }
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

}
