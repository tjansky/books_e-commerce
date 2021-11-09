import { NgModule } from '@angular/core';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [BasketComponent],
  imports: [
    BasketRoutingModule,
    SharedModule
  ]
})
export class BasketModule { }
