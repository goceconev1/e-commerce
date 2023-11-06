export interface Product {
  [x: string]: any;
  id: number;

  title: string;
  description: string;
  price: number;
}
export interface ProductQueryResponse {
  data: any;
  product: any;
  books: Product[];
}