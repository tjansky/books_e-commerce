import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../types/booksWithPagination';

@Injectable({
  providedIn: 'root'
})
export class AuthorApiService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;

  getTopAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl + "/Author/GetAllAuthors");
  }

}
