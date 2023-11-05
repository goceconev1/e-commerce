import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the 'map' operator
import { Product, ProductQueryResponse } from '../models/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) { }

  getProducts(): Observable<Product[]> {
    return this.apollo
      .watchQuery<ProductQueryResponse>({
        query: gql`
          query {
            books {
              id
              title
              description
              price
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((result: { data: { books: any[] } }) => result.data.books)
      );
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
        map((result) => result.data.product)
      );
  }

  private cartItems: number[] = [];
  private cartItemsSubject = new BehaviorSubject<number[]>(this.cartItems);

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(productId: number) {
    this.cartItems.push(productId);
    this.cartItemsSubject.next(this.cartItems);
  }
}
