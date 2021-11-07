import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Format } from '../types/booksWithPagination';

@Injectable({
  providedIn: 'root'
})
export class FormatApiService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;

  getAllFormats(): Observable<Format[]> {
    return this.http.get<Format[]>(this.apiUrl + "/Format/GetAllFormats");
  }

}
