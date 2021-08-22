import { Component, OnInit } from '@angular/core';
import { Product, products } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products = products;

  constructor() { }

  ngOnInit(): void {
  }

  public share() {
    window.alert('The product has been shared!');
  }

  public onNotify() {
    window.alert("You will be notified when the product goes on sale");
  }

  public onNotifyHasData(product: Product) {
    window.alert(`Product name is ${product.name}`);
  }
}
