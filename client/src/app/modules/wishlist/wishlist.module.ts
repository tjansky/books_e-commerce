import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WishlistRoutingModule } from './wishlist-routing.module';



@NgModule({
  declarations: [WishlistComponent],
  imports: [
    WishlistRoutingModule,
    SharedModule
  ]
})
export class WishlistModule { }
