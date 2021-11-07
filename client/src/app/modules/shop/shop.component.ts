import { Component, OnInit } from '@angular/core';
import { AuthorApiService } from 'src/app/data/services/author-api.service';
import { BookApiService } from 'src/app/data/services/book-api.service';
import { CategoryApiService } from 'src/app/data/services/category-api.service';
import { FormatApiService } from 'src/app/data/services/format-api.service';
import { Author, Book, BooksWithPagination, Category, Format, Pagination } from 'src/app/data/types/booksWithPagination';
import { BookParams } from 'src/app/shared/models/bookParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private bookApiService: BookApiService, 
              private authorApiService: AuthorApiService,
              private formatApiService: FormatApiService,
              private categoryApiService: CategoryApiService) { };

  books: Book[] = [];
  pagination: Pagination;

  formats: Format[] = [];
  categories: Category[] = [];
  topAuthors: Author[] = [];

  bookParams = new BookParams();

  ngOnInit(): void {
    this.getBooks();
    this.getTopAuthors();
    this.getFormats();
    this.getCategories();
  };

  getBooks() {
    // while we wait for books to be retrvied, empty old books list
    this.books = [];
    // get books and pagination data
    this.bookApiService.getAllBooks(this.bookParams).subscribe((res: BooksWithPagination) => {
      //console.log(res);
      this.books = res.books;
      this.pagination = res.pagination;
    }, error => {
      console.log(error);
    });
  }

  getFormats() {
    this.formatApiService.getAllFormats().subscribe((res: Format[]) => {
      this.formats = res;
    }, error => {
      console.log(error);
    });
  }

  getCategories() {
    this.categoryApiService.getAllCategories().subscribe((res: Category[]) => {
      this.categories = res;
    }, error => {
      console.log(error);
    });
  }

  getTopAuthors() {
    this.authorApiService.getTopAuthors().subscribe((res: Author[]) => {
      this.topAuthors = res;
    }, error => {
      console.log(error);
    });
  }

  onFormatSelected(formatId: number) {
    this.bookParams.formatId = formatId;
    this.getBooks();
  }

  onCategorySelected(categoryId: number) {
    this.bookParams.categoryId = categoryId;
    this.getBooks();
  }

  onTopAuthorSelected(authorId: number) {
    this.bookParams.authorId = authorId;
    this.getBooks();
  }

  onPaginationClick() {
    // 
  }

  onSearch() {
    this.bookParams.search = "sapiens";
    this.bookParams.pageNumber = 1;
    this.getBooks();
  }

  onReset() {
    // clear search input
    this.bookParams = new BookParams();
    this.getBooks();
  }

}