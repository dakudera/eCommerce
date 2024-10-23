import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [RouterModule, NgFor, CommonModule, NgIf],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }


  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

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

  incrementItem(cartItem: CartItem){
    this.cartService.incrementCartItem(cartItem);
  }

  decrementItem(cartItem: CartItem){
    this.cartService.decrementCartItem(cartItem);
  }

  removeItem(cartItem: CartItem){
    this.cartService.remove(cartItem);
  }

}
