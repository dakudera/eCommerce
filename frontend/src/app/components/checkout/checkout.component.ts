import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { ShopFormServiceService } from '../../services/shop-form-service.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

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
    private shopFormService: ShopFormServiceService) { }


  creaditCardYears: number[] = [];
  creaditCardMonths: number[] = [];

  ngOnInit(): void {

    this.setReviewOrder();
    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group(
          {
            firstName: [''],
            lastName: [''],
            email: ['']
          }
        ),
        shippingAddress: this.formBuilder.group(
          {
            street: [''],
            city: [''],
            state: [''],
            country: [''],
            zipCode: [''],
          }
        ),
        billingAddress: this.formBuilder.group(
          {
            street: [''],
            city: [''],
            state: [''],
            country: [''],
            zipCode: [''],
          }
        ),
        creditCard: this.formBuilder.group(
          {
            cardType: [''],
            nameOnCard: [''],
            cardNumber: [''],
            securityCode: [''],
            expirationMonth: [''],
            expirationYear: [''],
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
