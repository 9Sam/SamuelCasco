import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable } from 'rxjs';
import { AddProductResponse, ProductsResponse } from '../interfaces/responses.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);
  private readonly BASE_URL = environment.apiUrl;

  getProducts(): Observable<ProductsResponse> {
    return this.httpClient.get<ProductsResponse>(`${this.BASE_URL}/products`).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  validateProductId(productId: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(`${this.BASE_URL}/products/verification/${productId}`).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  addProduct(product: Product): Observable<AddProductResponse> {
    return this.httpClient.post<AddProductResponse>(`${this.BASE_URL}/products`, product).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  updateProduct(product: Product): Observable<AddProductResponse> {
    return this.httpClient
      .put<AddProductResponse>(`${this.BASE_URL}/products/${product.id}`, product)
      .pipe(
        catchError((error) => {
          throw error;
        }),
      );
  }

  deleteProduct(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/products/${id}`).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
}
