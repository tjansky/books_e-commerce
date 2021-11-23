import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderApiService } from 'src/app/data/services/order-api.service';
import { Order } from 'src/app/data/types/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderIdUrl;
  loadedOrder: Order;

  constructor(private orderApiService: OrderApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderIdUrl = this.route.snapshot.paramMap.get('id');
    // if there is id, get order details
    if (this.orderIdUrl) {
      this.loadOrderDetails(this.orderIdUrl);
    }
  }

  loadOrderDetails(orderId) {
    this.orderApiService.getOrderById(this.orderIdUrl).subscribe(res => {
      this.loadedOrder = res;
      console.log(this.loadedOrder);
    }, error => {
      console.log(error);
    });
  }

}
