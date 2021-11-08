import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private searchBooksQuerySource = new Subject<string>();
  searchBooksQuery$ = this.searchBooksQuerySource.asObservable();

  constructor() { }

  setSearchQuery(query: string) {
    this.searchBooksQuerySource.next(query);
  }

  deleteSearchQuery() {
    this.searchBooksQuerySource.next(null);
  }
}
