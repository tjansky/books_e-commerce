import { Component, OnInit } from '@angular/core';
import { OrderApiService } from 'src/app/data/services/order-api.service';
import { Order } from 'src/app/data/types/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderApiService: OrderApiService) { }
  orders: Order[] = [];

  ngOnInit(): void {
    this.loadUserOrders();
  }

  loadUserOrders() {
    this.orderApiService.getAllUserOrders().subscribe(res => {
      this.orders = res;
      console.log(this.orders);
    }, error => {
      console.log(error);
    });
  }

}
