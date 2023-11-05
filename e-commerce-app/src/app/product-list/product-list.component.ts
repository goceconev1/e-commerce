import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';
import { Product, ProductQueryResponse } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  changeSorting() {
    throw new Error('Method not implemented.');
  }
  viewProductDetails(arg0: number) {
    throw new Error('Method not implemented.');
  }
  applySortingAndFiltering() {
    throw new Error('Method not implemented.');
  }
  products: Product[] = [];
  sortBy: any;
  filterText: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery<ProductQueryResponse>({
        query: gql`
          query {
            books {
              id
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
}