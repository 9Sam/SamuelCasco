import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    fixture.componentRef.setInput('text', 'Test Button');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit btnClicked event when btnClick is called', () => {
    vi.spyOn(component.btnClicked, 'emit');

    component.btnClick();

    expect(component.btnClicked.emit).toHaveBeenCalled();
  });

  it('should emit btnClicked when the button is clicked in the template', () => {
    vi.spyOn(component.btnClicked, 'emit');

    const buttonElement = fixture.nativeElement.querySelector('button');

    buttonElement.click();

    expect(component.btnClicked.emit).toHaveBeenCalled();
  });
});
