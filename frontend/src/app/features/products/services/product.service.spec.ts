import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProductService } from './product.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProductService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products', () => {
    service.getProducts().subscribe((response) => {
      expect(response).toBeTruthy();
    });
  });

  it('should throw an error when the API call fails', () => {
    vi.spyOn(httpClient, 'get').mockReturnValue(throwError(() => new Error('API error')));
    service.getProducts().subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  });
});
