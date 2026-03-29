import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { ProductService } from '../../services/product.service';
import { map, single } from 'rxjs';
import { CommonModule } from '@angular/common';
import { productFields } from './utils/product-fields';
import { getErrorMessage } from './utils/error-handler';
import { productIdAsyncValidator } from './validators/product.validator';
import { futureDateValidator } from './validators/release-date.validator';

@Component({
  selector: 'app-product',
  imports: [Button, CommonModule, ReactiveFormsModule],
  template: `
    <div class="product-form">
      <form [formGroup]="productForm" class="form">
        <div class="form-header">
          <h1>Formulario de registro</h1>
        </div>
        <hr />
        <div class="form-body">
          @for (field of fields; track field.id) {
            <div>
              <label [for]="field.id">{{ field.label }}:</label>
              <input
                [type]="field.type"
                [id]="field.id"
                [formControlName]="field.id"
                [class.is-invalid]="
                  productForm.get(field.id)?.invalid && productForm.get(field.id)?.touched
                "
              />
              @if (isInvalid(field.id)) {
                <small class="error-msg">{{ getErrorMessage(field.id, productForm) }}</small>
              }
            </div>
          }
        </div>
        <div class="form-buttons">
          <app-button text="Reiniciar" type="secondary" (btnClicked)="onReset()"></app-button>
          <app-button text="Enviar" (btnClicked)="onSubmit()"></app-button>
        </div>
      </form>
    </div>
  `,
  styles: `
    h1 {
      font-size: 1.8rem;
    }

    hr {
      width: 100%;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 3px solid var(--color-dark-grey);
      border-radius: 4px;
      margin: 8px 0;
    }

    input:disabled {
      background-color: var(--color-disabled-grey);
      border: 3px solid var(--color-light-grey);
      cursor: not-allowed;
    }

    label {
      font-weight: bold;
    }

    label.disabled {
      color: var(--color-dark-grey);
    }

    .product-form {
      max-width: 800px;
      min-height: 50vh;
      margin: 0 auto;
      margin-bottom: 100px;
      background-color: var(--main-light-color);
    }

    .form-header {
      text-align: center;
      padding: 26px 0;
    }

    .form-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem 2.5rem;
      padding: 1.5rem 32px;
    }

    .form-buttons {
      display: flex;
      justify-content: center;
      gap: 4rem;
      padding: 0 32px 32px;
    }

    .is-invalid {
      border-color: var(--color-text-error);
    }

    .error-msg {
      color: var(--color-text-error);
    }

    @media (max-width: 768px) {
      .form-body {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Product implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  private readonly isEditing = signal(false);

  getErrorMessage = getErrorMessage;

  ngOnInit() {
    this.validateReleaseDate();
    this.productForm.get('date_revision')?.disable();
    this.productForm.updateValueAndValidity();

    const id = this.route.snapshot.queryParamMap.get('id');

    if (id) {
      this.isEditing.set(true);
      this.productForm.get('id')?.disable();
      this.productService
        .getProducts()
        .pipe(map((res) => res.data.find((p) => p.id === id)))
        .subscribe((product) => {
          console.log('product: ', product);
          if (product) {
            const { date_release, date_revision, ...rest } = product;

            this.productForm.patchValue({
              ...rest,
              date_release: date_release,
              date_revision: date_revision,
            });
          } else {
            console.error('Producto no encontrado');
            this.router.navigate(['/products']);
          }
        });
    }
  }

  fields = productFields;

  protected productForm = this.fb.group({
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      productIdAsyncValidator(this.productService),
    ],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', Validators.required],
    date_release: ['', [Validators.required, futureDateValidator()]],
    date_revision: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.isEditing()) {
        this.productService
          .updateProduct({
            id: this.productForm.get('id')?.value!,
            name: this.productForm.value.name!,
            description: this.productForm.value.description!,
            logo: this.productForm.value.logo!,
            date_release: this.productForm.value.date_release!,
            date_revision: this.productForm.get('date_revision')?.value!,
          })
          .subscribe({
            next: () => {
              this.router.navigate(['/products']);
            },
            error: (error) => {
              alert('Error al actualizar el producto: ' + error.message);
            },
          });
      } else {
        this.productService
          .addProduct({
            id: this.productForm.get('id')?.value!,
            name: this.productForm.value.name!,
            description: this.productForm.value.description!,
            logo: this.productForm.value.logo!,
            date_release: this.productForm.value.date_release!,
            date_revision: this.productForm.get('date_revision')?.value!,
          })
          .subscribe({
            next: () => {
              this.router.navigate(['/products']);
            },
            error: (error) => {
              alert('Error al agregar el producto: ' + error.message);
            },
          });
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onReset(): void {
    if (this.isEditing()) {
      this.productForm.get('name')?.reset();
      this.productForm.get('description')?.reset();
      this.productForm.get('logo')?.reset();
      this.productForm.get('date_release')?.reset();
      this.productForm.get('date_revision')?.reset();
    } else {
      this.productForm.reset();
    }
  }

  formatDateToYMD = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  };

  validateReleaseDate(): void {
    this.productForm.get('date_release')?.valueChanges.subscribe((value) => {
      if (this.productForm.get('date_release')?.valid) {
        const releaseDate = new Date(value as string);
        releaseDate.setFullYear(releaseDate.getFullYear() + 1);

        this.productForm.get('date_revision')?.setValue(releaseDate.toISOString().split('T')[0]);
        this.productForm.updateValueAndValidity();
      }
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
