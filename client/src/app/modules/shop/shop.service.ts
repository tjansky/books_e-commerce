import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private searchBooksQuerySource = new BehaviorSubject<string>(null);
  searchBooksQuery$ = this.searchBooksQuerySource.asObservable();

  private searchRemovedSource = new BehaviorSubject<boolean>(false);
  searchRemoved$ = this.searchRemovedSource.asObservable();

  constructor() { }

  setSearchQuery(query: string) {
    this.searchBooksQuerySource.next(query);
  }

  deleteSearchQuery() {
    this.searchBooksQuerySource.next(null);
  }

  removeSearch() {
    this.searchRemovedSource.next(true);
  }
}
