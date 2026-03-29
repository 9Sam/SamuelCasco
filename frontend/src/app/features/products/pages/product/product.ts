import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [Button],
  template: `
    <div class="product-form">
      <form class="form">
        <div class="form-header">
          <h1>Formulario de registro</h1>
        </div>
        <hr />
        <div class="form-body">
          @for (field of fields; track field.id) {
            <div>
              <label [class.disabled]="field.disabled" for="{{ field.id }}"
                >{{ field.label }}:</label
              >
              <input
                type="{{ field.type }}"
                id="{{ field.id }}"
                name="{{ field.id }}"
                [disabled]="field.disabled"
              />
              @if (isInvalid('id')) {
                <small class="error-msg">ID es obligatorio (min 3 caracteres)</small>
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService
        .getProducts()
        .pipe(map((res) => res.data.find((p) => p.id === id)))
        .subscribe((product) => {
          if (product) {
            const { date_release, date_revision, ...rest } = product;

            this.productForm.patchValue({
              ...rest,
              date_release: date_release.toISOString().split('T')[0],
              date_revision: date_revision.toISOString().split('T')[0],
            });
          } else {
            console.error('Producto no encontrado');
            this.router.navigate(['/products']);
          }
        });
    }
  }

  fields = [
    {
      id: 'id',
      label: 'ID',
      type: 'text',
      disabled: true,
    },
    {
      id: 'name',
      label: 'Nombre',
      type: 'text',
      disabled: false,
    },
    {
      id: 'description',
      label: 'Descripción',
      type: 'text',
      disabled: false,
    },
    {
      id: 'logo',
      label: 'Logo',
      type: 'text',
      disabled: false,
    },
    {
      id: 'date_release',
      label: 'Fecha de liberación',
      type: 'date',
      disabled: false,
    },
    {
      id: 'date_revision',
      label: 'Fecha de revisión',
      type: 'date',
      disabled: false,
    },
  ];

  protected productForm = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: [''],
    date_release: ['', [Validators.required]],
    date_revision: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Datos del producto:', this.productForm.value);
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.productForm.reset();
  }

  isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
