import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { firstValueFrom, from, Observable, of } from 'rxjs';
import { productIdAsyncValidator } from './product.validator';

describe('productIdAsyncValidator', () => {
  let productServiceMock: any;

  beforeEach(() => {
    productServiceMock = {
      validateProductId: vi.fn(),
    };
  });

  it('debe ser creado correctamente', () => {
    const validator = productIdAsyncValidator(productServiceMock);
    expect(validator).toBeTruthy();
  });

  it('should return null if control value is empty', async () => {
    const validator = productIdAsyncValidator(productServiceMock);
    const control = { value: '' } as AbstractControl;

    const result = await firstValueFrom(from(validator(control)));
    expect(result).toBeNull();
  });

  it('should return null if product id is not valid', async () => {
    productServiceMock.validateProductId.mockReturnValue(of(false));
    const validator = productIdAsyncValidator(productServiceMock);
    const control = { value: 'valid-product-id' } as AbstractControl;

    const result = await firstValueFrom(from(validator(control)));
    expect(result).toBeNull();
  });

  it('should return productIdExists error if product id is valid', async () => {
    productServiceMock.validateProductId.mockReturnValue(of(true));
    const validator = productIdAsyncValidator(productServiceMock);
    const control = { value: 'invalid-product-id' } as AbstractControl;

    const result = await firstValueFrom(from(validator(control)));
    expect(result).toEqual({ productIdExists: true });
  });
});
