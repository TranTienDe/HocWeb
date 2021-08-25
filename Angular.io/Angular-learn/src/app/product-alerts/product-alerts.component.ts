import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.scss']
})
export class ProductAlertsComponent implements OnInit {

  @Input() product: Product | undefined;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Output() notifyHasData: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public notifyMe() {
    this.notify.emit();
  }

  public notifyMeHasData(product: Product) {
    this.notifyHasData.emit(product);
  }
}
