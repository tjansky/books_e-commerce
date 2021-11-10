import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaymentApiService } from 'src/app/data/services/payment-api.service';
import { Basket } from 'src/app/shared/models/basket';
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

  @ViewChild('cardNumber', {static: true}) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', {static: true}) cardCvcElement: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);

  constructor(private paymentApiService: PaymentApiService, private basketService: BasketService) { }
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

  onContinueToPayment() {
    this.paymentApiService.createOrUpdatePaymentIntent(this.basket).subscribe((res: Basket) => {
      console.log(res);
      // todo - set new basket in local storage and basket subject
    }, error => {
      console.log(error);
    });
  }

}
