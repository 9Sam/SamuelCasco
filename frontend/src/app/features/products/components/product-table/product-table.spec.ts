import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTable } from './product-table';
import { By } from '@angular/platform-browser';
import { Dropdown } from '@app/shared/components/dropdown/dropdown';

const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    logo: 'logo1.png',
    date_release: new Date(),
    date_revision: new Date(),
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description 2',
    logo: 'logo2.png',
    date_release: new Date(),
    date_revision: new Date(),
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'Description 3',
    logo: 'logo3.png',
    date_release: new Date(),
    date_revision: new Date(),
  },
  {
    id: '4',
    name: 'Product 4',
    description: 'Description 4',
    logo: 'logo4.png',
    date_release: new Date(),
    date_revision: new Date(),
  },
  {
    id: '5',
    name: 'Product 5',
    description: 'Description 5',
    logo: 'logo5.png',
    date_release: new Date(),
    date_revision: new Date(),
  },
  {
    id: '6',
    name: 'Product 6',
    description: 'Description 6',
    logo: 'logo6.png',
    date_release: new Date(),
    date_revision: new Date(),
  },
];

describe('ProductTable', () => {
  let component: ProductTable;
  let fixture: ComponentFixture<ProductTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTable);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the correct headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('th');

    expect(headers[0].textContent).toContain('Logo');
    expect(headers[1].textContent).toContain('Nombre del producto');
    expect(headers[2].textContent).toContain('Descripción');
    expect(headers[3].textContent).toContain('Fecha de liberación');
    expect(headers[4].textContent).toContain('Fecha de reestructuración');
  });

  it('should display the correct number of products based on the selected option', () => {
    fixture.componentRef.setInput('products', mockProducts);
    fixture.detectChanges();
    component.onOptionSelected('3');

    expect(component.displayedProducts()).toEqual(mockProducts.slice(0, 3));
  });

  it('should display and update the results count correctly', () => {
    fixture.componentRef.setInput('products', mockProducts);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const resultsCount = compiled.querySelector('.table-footer span');

    expect(resultsCount?.textContent).toContain('5 Resultados');
  });

  it('debería actualizar el límite de productos cuando se selecciona una opción', () => {
    const dropdown = fixture.debugElement.query(By.directive(Dropdown)).componentInstance;

    dropdown.optionSelected.emit(20);
    fixture.detectChanges();

    expect(component.selectedOption()).toBe(20);
  });
});
