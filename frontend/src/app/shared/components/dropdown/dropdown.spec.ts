import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dropdown } from './dropdown';

describe('Dropdown', () => {
  let component: Dropdown;
  let fixture: ComponentFixture<Dropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(Dropdown);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('options', [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
    ]);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected option id on change', () => {
    vi.spyOn(component.optionSelected, 'emit');

    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    selectElement.value = '2';
    selectElement.dispatchEvent(new Event('change'));

    expect(component.optionSelected.emit).toHaveBeenCalledWith('2');
  });

  it('should render options in the select element', () => {
    const optionElements: HTMLOptionElement[] = fixture.nativeElement.querySelectorAll('option');
    expect(optionElements.length).toBe(3);
    expect(optionElements[0].textContent).toBe('Option 1');
    expect(optionElements[1].textContent).toBe('Option 2');
    expect(optionElements[2].textContent).toBe('Option 3');
  });
});
