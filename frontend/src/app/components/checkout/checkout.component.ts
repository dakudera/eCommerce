import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { ShopFormServiceService } from '../../services/shop-form-service.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { ShopValidators } from '../../validators/shop-validators';
import { CheckoutService } from '../../services/checkout-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Purchase } from '../../common/purchase';
import { OrderItem } from '../../common/order-item';
import { Customer } from '../../common/customer';
import { Address } from '../../common/address';
import { Order } from '../../common/order';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder, private cartService: CartService,
    private shopFormService: ShopFormServiceService, private checkoutService: CheckoutService,
    private router: Router) { }


  creaditCardYears: number[] = [];
  creaditCardMonths: number[] = [];

  ngOnInit(): void {

    this.setReviewOrder();
    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group(
          {
            firstName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
            email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
          }
        ),
        shippingAddress: this.formBuilder.group(
          {
            street: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
            city: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
            state: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            zipCode: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
          }
        ),
        billingAddress: this.formBuilder.group(
          {
            street: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
            city: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
            state: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            zipCode: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
          }
        ),
        creditCard: this.formBuilder.group(
          {
            cardType: new FormControl('', [Validators.required]),
            nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
            cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
            securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
            expirationMonth: '',
            expirationYear: '',
          }
        )
      }
    );

    const startMonth: number = new Date().getMonth() + 1;

    this.shopFormService.getCreditCardsMonth(startMonth).subscribe(
      data => {
        this.creaditCardMonths = data;
      }
    );

    this.shopFormService.getCreditCardsYears().subscribe(
      data => {
        this.creaditCardYears = data;
      }
    );

    this.initCountries();

  }

  onSubmit() {
    // if (this.checkoutFormGroup.invalid) {
    //   this.checkoutFormGroup.markAllAsTouched();
    //   console.log("exit");
    //   return;
    // }

    const purchase: Purchase = this.setCheckoutFormData(this.checkoutFormGroup);
    this.checkoutService.placeOrder(purchase);

    this.resetCart();
  }


  setCheckoutFormData(formValues: any): Purchase {
    // Create a new instance of CheckoutForm
    const checkoutForm = new Purchase();

    // Map form values to the customer details
    checkoutForm.customer = new Customer();
    checkoutForm.customer.firstName = this.firstName?.value;
    checkoutForm.customer.lastName = this.lastName?.value;
    checkoutForm.customer.email = this.email?.value;

    // Map form values to the shipping address
    checkoutForm.shippingAddress = new Address()
    checkoutForm.shippingAddress.street = this.shippingAddressStreet?.value;
    checkoutForm.shippingAddress.city = this.shippingAddressCity?.value;
    checkoutForm.shippingAddress.state = JSON.parse(JSON.stringify(this.shippingAddressState?.value)).name;
    checkoutForm.shippingAddress.country = JSON.parse(JSON.stringify(this.shippingAddressCountry?.value)).name;
    checkoutForm.shippingAddress.zipCode = this.shippingAddressZipCode?.value;

    // Map form values to the billing address
    checkoutForm.billingAddress = new Address();
    checkoutForm.billingAddress.street = this.billingAddressStreet?.value;
    checkoutForm.billingAddress.city = this.billingAddressCity?.value;
    checkoutForm.billingAddress.state = JSON.parse(JSON.stringify(this.billingAddressState?.value)).name;
    checkoutForm.billingAddress.country = JSON.parse(JSON.stringify(this.billingAddressCountry?.value)).name;
    checkoutForm.billingAddress.zipCode = this.billingAddressZipCode?.value;


    let orderItems: OrderItem[] = this.cartService.cartItems.map(t => new OrderItem(t));

    checkoutForm.order = new Order();
    checkoutForm.order.totalPrice = this.totalPrice;
    checkoutForm.order.totalQuantity = this.totalQuantity;
    checkoutForm.orderItems = orderItems;


    // Map form values to the credit card details
    // checkoutForm.creditCard.cardType = formValues.creditCard.cardType;
    // checkoutForm.creditCard.nameOnCard = formValues.creditCard.nameOnCard;
    // checkoutForm.creditCard.cardNumber = formValues.creditCard.cardNumber;
    // checkoutForm.creditCard.securityCode = formValues.creditCard.securityCode;
    // checkoutForm.creditCard.expirationMonth = formValues.creditCard.expirationMonth;
    // checkoutForm.creditCard.expirationYear = formValues.creditCard.expirationYear;

    // Return the populated CheckoutForm instance
    return checkoutForm;
  }

  resetCart(){
    
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    
    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }


  setReviewOrder() {

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );

    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
      }
    );
  }


  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

  get cardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get nameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get cardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get securityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }


  copyShippingAddressToBillingAddress(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      this.billingAddressStates = this.shippingAddressStates;

    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);


    let startMonth: number = 0;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth += 1;
    }

    this.shopFormService.getCreditCardsMonth(startMonth).subscribe(
      data => {
        this.creaditCardMonths = data;
      }
    );
  }

  async initCountries() {
    try {
      this.countries = await this.shopFormService.getCountries();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }


  async getStates(type: string) {
    const formGroup = this.checkoutFormGroup.get(type);
    const countryCode = formGroup?.value.country.code;

    try {
      const result: State[] = await this.shopFormService.getStates(countryCode);
      if (type === 'shippingAddress') {
        this.shippingAddressStates = result;
      } else {
        this.billingAddressStates = result;
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

}
