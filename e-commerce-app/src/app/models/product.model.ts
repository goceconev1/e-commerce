export interface Product {
  id: number;

  title: string;
  description: string;
  price: number;
}
export interface ProductQueryResponse {
  product: any;
  books: Product[];
}