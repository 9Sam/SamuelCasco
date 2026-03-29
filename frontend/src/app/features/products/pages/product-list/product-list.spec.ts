import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { Subject } from 'rxjs';
import { ProductService } from '../../services/product.service';

const productsRes = {
  data: [
    {
      id: 'trj-001',
      name: 'Tarjeta de Crédito Oro',
      description:
        'Tarjeta con beneficios exclusivos y tasa preferencial para compras internacionales.',
      logo: 'images/logo-default.png',
      date_release: new Date('2025-01-01'),
      date_revision: new Date('2026-01-01'),
    },
  ],
};

const productsServiceStub = {
  getProducts: vi.fn(),
};

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;
  let getProductsSubject: Subject<any>;

  beforeEach(async () => {
    productsServiceStub.getProducts.mockReset();
    getProductsSubject = new Subject<any>();
    productsServiceStub.getProducts.mockReturnValue(getProductsSubject);

    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [{ provide: ProductService, useValue: productsServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    getProductsSubject.next(productsRes);
    getProductsSubject.complete();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load products on init', async () => {
    getProductsSubject.next(productsRes);
    getProductsSubject.complete();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.products()).toEqual(productsRes.data);
  });

  it('should display the skeleton while loading', () => {
    fixture.detectChanges();

    expect(component.isLoading()).toBe(true);

    getProductsSubject.next(productsRes);
    getProductsSubject.complete();
    fixture.detectChanges();

    expect(component.isLoading()).toBe(false);
  });

  it('should handle error when loading products', () => {
    const mockError = new Error('Failed to load');
    getProductsSubject.error(mockError);
    fixture.detectChanges();

    expect(component.products()).toEqual([]);
    expect(component.isLoading()).toBe(false);
  });
});
