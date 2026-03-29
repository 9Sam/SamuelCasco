import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product } from './product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

const mockProduct = {
  id: '123',
  name: 'Producto de Prueba',
  description: 'Descripción de prueba para el componente',
  logo: 'logo.png',
  date_release: new Date('2025-01-01'),
  date_revision: new Date('2026-01-01'),
};

const routerStub = {
  navigate: () => vi.fn(),
};

const productServiceStub = {
  getProducts: () => vi.fn(),
  getProductById: () => vi.fn(),
  updateProduct: () => vi.fn(),
  addProduct: () => vi.fn(),
};

const activatedRouteStub = {
  snapshot: {
    queryParamMap: {
      get: vi.fn().mockReturnValue(null),
    },
  },
};

describe('Product', () => {
  let component: Product;
  let fixture: ComponentFixture<Product>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Product],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
        {
          provide: Router,
          useValue: routerStub,
        },
      ],
    }).compileComponents();

    vi.spyOn(window, 'alert').mockImplementation(() => {});

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization creation mode', () => {
    it('should intialize witn an empty form in create mode', () => {
      fixture.detectChanges();
      expect(component['productForm'].get('id')?.enabled).toBe(true);
      expect(component['productForm'].value.id).toBe('');
    });
  });

  describe('Initialization (Create Mode)', () => {
    it('should initialize with an empty form in create mode', () => {
      fixture.detectChanges();
      expect(component['productForm'].get('id')?.enabled).toBe(true);
      expect(component['productForm'].value.id).toBe('');
    });
  });

  // describe('Initialization (Edit Mode)', () => {
  //   it('should load product data and disable ID field in edit mode', async () => {
  //     activatedRouteStub.snapshot.queryParamMap.get.mockReturnValue('123');

  //     fixture.detectChanges();
  //     await fixture.whenStable();

  //     expect(component['productForm'].get('id')?.disabled).toBe(true);
  //     expect(component['productForm'].get('name')?.value).toBe(mockProduct.name);
  //   });

  // it('should navigate to /products if product is not found', async () => {
  //   activatedRouteStub.snapshot.queryParamMap.get.mockReturnValue('non-existent');
  //   vi.spyOn(productServiceStub, 'getProductById').mockReturnValue(of({ data: [] }) as any);

  //   fixture.detectChanges();
  //   await fixture.whenStable();

  //   expect(routerStub.navigate).toHaveBeenCalledWith(['/products']);
  // });
  // });

  // describe('Business Logic & Validations', () => {
  //   it('should calculate date_revision automatically (release + 1 year)', () => {
  //     fixture.detectChanges();
  //     const releaseDate = '2025-05-20';
  //     const expectedRevision = '2026-05-20';
  //     component['productForm'].get('date_release')?.setValue(releaseDate);

  //     expect(component['productForm'].get('date_revision')?.value).toBe(expectedRevision);
  //   });

  //   it('should be invalid if name is too short', () => {
  //     const nameControl = component['productForm'].get('name');
  //     nameControl?.setValue('abc');
  //     expect(nameControl?.valid).toBe(false);
  //     expect(nameControl?.hasError('minlength')).toBe(true);
  //   });
  // });

  // describe('Form Submission', () => {
  //   it('should call addProduct on valid form in create mode', async () => {
  //     fixture.detectChanges();
  //     vi.spyOn(productServiceStub, 'addProduct').mockReturnValue(of({}) as any);

  //     // Llenamos el formulario
  //     component['productForm'].patchValue({
  //       id: 'new-id',
  //       name: 'Valid Name',
  //       description: 'Valid Description Longer than 10',
  //       logo: 'logo.png',
  //       date_release: '2025-01-01',
  //       date_revision: '2026-01-01',
  //     });

  //     component.onSubmit();

  //     expect(productServiceStub.addProduct).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalledWith(['/products']);
  //   });

  // it('should call updateProduct on valid form in edit mode', async () => {
  //   activatedRouteStub.snapshot.queryParamMap.get.mockReturnValue('trj-test');
  //   vi.spyOn(productServiceStub, 'getProductById').mockReturnValue(of(mockProduct) as any);
  //   vi.spyOn(productServiceStub, 'updateProduct').mockReturnValue(of({}) as any);

  //   fixture.detectChanges();
  //   await fixture.whenStable();

  //   component.onSubmit();

  //   expect(productServiceStub.updateProduct).toHaveBeenCalled();
  //   expect(routerStub.navigate).toHaveBeenCalledWith(['/products']);
  // });

  // it('should mark all fields as touched if form is invalid', () => {
  //   const spy = vi.spyOn(component['productForm'], 'markAllAsTouched');
  //   component.onSubmit();
  //   expect(spy).toHaveBeenCalled();
  // });
  // });

  // describe('Reset Logic', () => {
  //   it('should reset the entire form in create mode', () => {
  //     component['productForm'].patchValue({ name: 'Changed' });
  //     component.onReset();
  //     expect(component['productForm'].get('name')?.value).toBe(null);
  //   });

  //   it('should not reset the ID in edit mode', async () => {
  //     activatedRouteStub.snapshot.queryParamMap.get.mockReturnValue('123');
  //     vi.spyOn(productServiceStub, 'getProducts').mockReturnValue(
  //       of({ data: [mockProduct] }) as any,
  //     );
  //     component.ngOnInit();
  //     fixture.detectChanges();
  //     await fixture.whenStable();

  //     component['productForm'].get('name')?.setValue('New Name');
  //     component.onReset();

  //     expect(component['productForm'].get('id')?.disabled).toBe(true);
  //   });
  // });
});
