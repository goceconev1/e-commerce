import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(route: Router) { }

  private orders: Product[] = [];

  addToOrder(product: Product): void {
    this.orders.push(product);
  }

  getOrders(): Product[] {
    return this.orders;
  }
}
