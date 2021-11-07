import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksParams } from 'src/app/shared/dtos/getBooksParams';
import { environment } from 'src/environments/environment';
import { BooksWithPagination } from '../types/booksWithPagination';


@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;

  getAllBooks(bookParams: BooksParams): Observable<BooksWithPagination> {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    // params = params.append('firstParameter', bookParams.search);
    // params = params.append('secondParameter', bookParams.categoryId.toString());
    
    return this.http.get<BooksWithPagination>(this.apiUrl + "/Book/GetAllBooks");
  }
}
