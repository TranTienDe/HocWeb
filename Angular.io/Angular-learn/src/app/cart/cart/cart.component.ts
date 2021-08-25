import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public items: Product[] = [];
  public checkoutForm = this.formBuilder.group(
    {
      name: '',
      address: ''
    }
  );

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  public onSubmit() {
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

}
