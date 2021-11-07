import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../types/booksWithPagination';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + "/Category/GetAllCategories");
  }
}
