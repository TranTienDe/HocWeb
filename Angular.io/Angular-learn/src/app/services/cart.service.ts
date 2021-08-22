import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public items: Product[] = [];

  constructor(private http: HttpClient) { }

  public addToCart(product: Product) {
    this.items.push(product);
  }

  public getItems(){
    return this.items;
  }

  public clearCart(){
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }

}
