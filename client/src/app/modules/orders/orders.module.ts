import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderDetailsComponent } from './order-details/order-details.component';



@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent],
  imports: [
    SharedModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
