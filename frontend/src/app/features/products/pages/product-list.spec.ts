import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { of, throwError } from 'rxjs';
import { ProductService } from '../services/product.service';

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
  getProducts: vi.fn().mockReturnValue(of(productsRes)),
};

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [{ provide: ProductService, useValue: productsServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    vi.spyOn(component['producstService'], 'getProducts').mockReturnValue(of(productsRes as any));
    expect(component.products()).toEqual(productsRes.data);
  });

  it('should handle error when loading products', () => {
    const mockError = new Error('Failed to load');
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.spyOn(productsServiceStub, 'getProducts').mockReturnValue(throwError(() => mockError));

    const fixture = TestBed.createComponent(ProductList);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error cargando productos:', mockError);
    expect(component.products()).toEqual([]);
  });
});
