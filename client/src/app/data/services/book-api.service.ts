import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookParams } from 'src/app/shared/models/bookParams';
import { environment } from 'src/environments/environment';
import { Book, BooksWithPagination } from '../types/booksWithPagination';


@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;

  getAllBooks(bookParams: BookParams): Observable<BooksWithPagination> {
    let params = new HttpParams();
    
    if (bookParams.formatId !== 0) {
      params = params.append('FormatId', bookParams.formatId.toString());
    }

    if (bookParams.categoryId !== 0) {
      params = params.append('CategoryId', bookParams.categoryId.toString());
    }

    if (bookParams.authorId !== 0) {
      params = params.append('AuthorId', bookParams.authorId.toString());
    }

    if (bookParams.search) {
      params = params.append('search', bookParams.search);
    }

    // TODO - add sort in future

    params = params.append('PageNumber', bookParams.pageNumber.toString());
    params = params.append('PageSize', bookParams.pageSize.toString());
  
    
    return this.http.get<BooksWithPagination>(this.apiUrl + "/Book/GetAllBooks", {params});
  }

  getBookDetailsById(bookId: number): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + "/Book/GetBookById/" + bookId);
  }

  getUserWishlist(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/Book/GetUserWishlist');
  }

  addBookToWishlist(bookId: number): Observable<Book> {
    return this.http.post<Book>(this.apiUrl + '/Book/SetBookInWishlist/' + bookId, null);
  }

  removeBookFromWishlist(bookId: number): Observable<number> {
    return this.http.delete<number>(this.apiUrl + '/Book/RemoveBookFromWishlist/' + bookId);
  }

}
