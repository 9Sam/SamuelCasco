import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProductService } from './product.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

const product = {
  id: 'new-id',
  name: 'New Product',
  description: 'Description of the new product',
  price: 100,
  date_release: '2023-01-01',
  date_revision: '2023-01-02',
};

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

  describe('getProducts', () => {
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

  describe('validateProductId', () => {
    it('should return true for a valid product ID', () => {
      service.validateProductId('valid-id').subscribe((response) => {
        expect(response).toBe(true);
      });
    });

    it('should return false for an invalid product ID', () => {
      service.validateProductId('invalid-id').subscribe((response) => {
        expect(response).toBe(false);
      });
    });
  });

  describe('addProduct', () => {
    it('should add a new product successfully', () => {
      service.addProduct(product as any).subscribe((response) => {
        expect(response).toBeTruthy();
      });
    });

    it('should throw an error when the API call fails', () => {
      vi.spyOn(httpClient, 'post').mockReturnValue(throwError(() => new Error('API error')));

      service.addProduct(product as any).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });
    });
  });

  describe('updateProduct', () => {
    it('should update a product successfully', () => {
      service.updateProduct(product as any).subscribe((response) => {
        expect(response).toBeTruthy();
      });
    });

    it('should throw an error when the API call fails', () => {
      vi.spyOn(httpClient, 'put').mockReturnValue(throwError(() => new Error('API error')));

      service.updateProduct(product as any).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product successfully', () => {
      service.deleteProduct('product-id').subscribe((response) => {
        expect(response).toBeUndefined();
      });
    });

    it('should throw an error when the API call fails', () => {
      vi.spyOn(httpClient, 'delete').mockReturnValue(throwError(() => new Error('API error')));

      service.deleteProduct('product-id').subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });
    });
  });
});
