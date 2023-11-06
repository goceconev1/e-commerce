import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductQueryResponse } from '../models/product.model';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  sortedProducts: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private apollo: Apollo,

  ) { }


  ngOnInit() {

    this.route.params.subscribe((params) => {
      const productId = +params['id'];
      console.log('Product ID received in product-detail:', productId);
      this.getProductDetails(productId);
    });
  }

  getProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe((product) => {
      console.log('Product Details received:', product);
      this.product = product;
    });
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.apollo
      .query<ProductQueryResponse>({
        query: gql`
          query GetProductById($id: ID!) {
            product(id: $id) {
              id
              title
              description
              price
            }
          }
        `,
        variables: { id },
      })
      .pipe(
        map((result: any) => result.data.product)
      );
  }

  addToCart(product: Product): void {
    this.orderService.addToOrder(product);
    this.router.navigate(['/order']);

  }


  goBack() {
    this.router.navigate(['/']);

  }

}
