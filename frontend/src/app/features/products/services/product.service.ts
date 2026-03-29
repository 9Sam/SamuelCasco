import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable } from 'rxjs';
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
      map((res) => ({
        ...res,
        data: res.data.map((product) => ({
          ...product,
          date_release: new Date(product.date_release),
          date_revision: new Date(product.date_revision),
        })),
      })),
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
}
