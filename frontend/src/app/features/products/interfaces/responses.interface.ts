import { Product } from '../models/product.interface';

export interface ProductsResponse {
  data: Product[];
}

export interface AddProductResponse {
  message: string;
  data: Product;
}

export interface APIError {
  name: string;
  message: string;
}
