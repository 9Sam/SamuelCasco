import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ProductService } from '@app/features/products/services/product.service';
import { map, Observable, of } from 'rxjs';

export function productIdAsyncValidator(productService: ProductService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    return productService.validateProductId(control.value).pipe(
      map((isValid) => {
        return !isValid ? null : { productIdExists: true };
      }),
    );
  };
}
