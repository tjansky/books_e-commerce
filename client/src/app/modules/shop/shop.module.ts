import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookCardComponent } from './book-card/book-card.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookPaginationComponent } from './book-pagination/book-pagination.component';



@NgModule({
  declarations: [ShopComponent, BookCardComponent, BookDetailsComponent, BookPaginationComponent],
  imports: [
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }
