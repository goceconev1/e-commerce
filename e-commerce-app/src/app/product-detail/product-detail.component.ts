import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = +params['id'];
      this.getProductDetails(productId);
    });
  }

  getProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = product;
    });
  }
  addToCart(product: Product): void {
    this.orderService.addToOrder(product);
    this.router.navigate(['/order']);

  }


  goBack() {
    this.router.navigate(['/']);

  }

}
