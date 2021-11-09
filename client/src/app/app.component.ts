import { Component } from '@angular/core';
import { BasketService } from './modules/basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket() {
    const currentBasket = this.basketService.getBasketFromLocStorage();
    if (currentBasket) {
      this.basketService.setBasket(currentBasket);
    }
  }

}
