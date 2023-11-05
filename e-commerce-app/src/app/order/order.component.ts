import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderProducts: Product[] = [];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.orderProducts = this.orderService.getOrders();
  }
  product: any;
  goBack() {
    this.router.navigate(['/']);

  }



}






