import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ShopComponent],
  imports: [
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }
