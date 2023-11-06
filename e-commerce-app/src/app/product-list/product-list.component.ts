import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';
import { Product, ProductQueryResponse } from '../models/product.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  productService: any;
  sortedProducts: Product[] = [];
  sortBy: string = '';
  filterText: string = '';
  selectedItems: Product[] = [];


  getProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.applySortingAndFiltering();
    });
  }
  changeSorting() {
    this.applySortingAndFiltering();
  }

  viewProductDetails(productId: number) {
    console.log('Navigating to product-detail with product ID:', productId);

    this.router.navigate(['/product', productId]);

  }

  applySortingAndFiltering() {
    this.sortedProducts = [...this.products];

    if (this.sortBy === 'price-low-to-high') {
      this.sortedProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high-to-low') {
      this.sortedProducts.sort((a, b) => b.price - a.price);
    }

    this.sortedProducts = this.sortedProducts.filter(product =>
      product.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
  products: Product[] = [];


  constructor(private apollo: Apollo, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.apollo
      .watchQuery<ProductQueryResponse>({
        query: gql`
          query {
            books {
              id
              price
              title
              description
            }
          }
        `,
      })
      .valueChanges.subscribe((result) => {
        this.products = result.data.books;
      });
  }
  //
  addToCart(product: Product): void {
    this.orderService.addToOrder(product); // Add the product to the order
    this.router.navigate(['/order']);
  }
}
