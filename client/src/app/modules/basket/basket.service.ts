import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/data/types/booksWithPagination';
import { Basket, Item } from 'src/app/shared/models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketSource = new BehaviorSubject<Basket>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<number>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor() { }

  setBasket(basket: Basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
    this.basketSource.next(basket);
    this.calculateTotals();
  }

  // getBasket() {
  //   const basket: Basket = this.getBasketFromLocStorage();
  //   if (basket) {
  //     this.basketSource.next(basket);
  //   }
  // }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  getBasketFromLocStorage():Basket {
    // get basket string from local storage and deserialize it to object
    const basketString: string = localStorage.getItem("basket");
    console.log(basketString);
    const basket: Basket = JSON.parse(basketString);
    // return basket object
    return basket;
  }

  addItemToBasket(book: Book, quantity = 1) {
    const itemToAdd: Item = this.mapBookToItem(book, quantity);
    const basket: Basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(item: Item) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket();
      }
    }
  }

  incrementItemQuantity(item: Item) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: Item) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  deleteBasket() {
    this.basketSource.next(null);
    localStorage.removeItem("basket");
  }

  private addOrUpdateItem(items: Item[], itemToAdd: Item, quantity: number): Item[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
 }

  private createBasket(): Basket {
    const basket: Basket = {
      items: []
    }
    return basket;
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const total = basket.items.reduce((a,b) => (b.price * b.quantity) + a, 0);
    this.basketTotalSource.next(total);
  }

  private mapBookToItem(book: Book, quantity: number): Item {
    return {
      id: book.id,
      title: book.displayName,
      image: book.image,
      price: book.price,
      quantity: quantity
    };
  }


}



// var basket1: Basket = {
//   items: [
//     {
//       id: 1,
//       title: "Saoiebs",
//       image: "string",
//       price: 19,
//       quantity: 2
//     }
//   ],
//   clientSecret: "string",
//   paymentIntentId: "string"
// }