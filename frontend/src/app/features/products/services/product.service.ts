import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable } from 'rxjs';
import { ProductsResponse } from '../interfaces/responses.interface';

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
}
