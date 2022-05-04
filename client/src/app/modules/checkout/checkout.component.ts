import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderApiService } from 'src/app/data/services/order-api.service';
import { PaymentApiService } from 'src/app/data/services/payment-api.service';
import { Basket } from 'src/app/shared/models/basket';
import { CreateOrder, CreateOrderItem } from 'src/app/shared/models/createOrder';

import { BasketService } from '../basket/basket.service';

declare var Stripe;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {
  basket: Basket;
  basketTotal$: Observable<number>;
  checkoutForm: FormGroup;
  checkoutDetailsForm: FormGroup;
  buyerData: {fullName: string, address: string, town: string, state: string, postcode: string};

  detailsSubmited = false;

  @ViewChild('cardNumber', {static: true}) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', {static: true}) cardCvcElement: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);

  constructor(private paymentApiService: PaymentApiService, 
              private basketService: BasketService,
              private orderApiService: OrderApiService,
              private router: Router) { }
  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51JsueXEJ9ggCghiiJ9F0dkwgRVRcExUp4GzFktKOFbSly2yxfnioHGv4N7Ievl1HNssHOmF42KvN1SGCgP2f4L3W00IstjXK5N');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnInit(): void {
    // set details form
    this.checkoutDetailsForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required),
      state: new FormControl(''),
      postcode: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });

    // set checkout form
    this.checkoutForm = new FormGroup({
      nameOnCard: new FormControl('')
    });

    this.basketService.basket$.subscribe(res => this.basket = res);
    this.basketTotal$ = this.basketService.basketTotal$;

    
  }

  onChange({error}) {
    if (error) {
      this.cardErrors = error.message;
    } else {
      this.cardErrors = null;
    }
  }

  onSubmitDetails() {
    this.detailsSubmited = true;

    console.log("okinut details forma");
    console.warn(this.checkoutDetailsForm.value);
    const formData = this.checkoutDetailsForm.value;

    this.checkoutDetailsForm.disable();
    // disejblaj i button

    this.buyerData = { 
      fullName: formData.fullName,
      address: formData.address,
      town: formData.town,
      state: formData.state,
      postcode: formData.postcode
    }

    this.paymentApiService.createOrUpdatePaymentIntent(this.basket).subscribe((res: Basket) => {
      console.log(res);
      // set new basket with paymentIntent
      this.basketService.setBasket(res);
    }, error => {
      console.log(error);
    });
  }


  onPayment() {
    const orderToCreate: CreateOrder = this.createOrderFromBasket(this.basket);
    console.log(orderToCreate);
    this.orderApiService.addOrder(orderToCreate).subscribe((order) => {
      console.log("Order added");
      console.log(order);

      this.stripe.confirmCardPayment(this.basket?.clientSecret, {
        payment_method: {
          card: this.cardNumber,
          billing_details: {
            name: this.checkoutForm.get('nameOnCard').value
          }
        }
      }).then(result => {
        console.log(result);
        if (result.paymentIntent) {
          // payment went successfuly, set order status to successful
          this.orderApiService.setOrderStatusToSuccessful(order.id).subscribe(updatedOrder => {
            //order status is set to successful
            console.log("Order na successful updejtan");
            // navigate to order details
            this.router.navigateByUrl("/orders");
          }, error => {
            console.log(error);
          })

          // delete basket
          this.basketService.deleteBasket();

        } else {
          console.log("Payment failed");
        }
      })
    }, error => {
      console.log(error);
    });
  }

  private createOrderFromBasket(basket: Basket): CreateOrder  {
    let orderItems: CreateOrderItem[] = [];
    basket.items.forEach(i => orderItems.push({bookId: i.id, quantity: i.quantity}));
    
    return {
      shipToFirstName: this.buyerData.fullName,
      shipToLastName: this.buyerData.fullName,
      shipToStreet: this.buyerData.address,
      shipToCity: this.buyerData.town,
      shipToZipcode: this.buyerData.postcode,
      paymentIntendId: basket.paymentIntentId,
      orderItems: orderItems
    }
  }

}
