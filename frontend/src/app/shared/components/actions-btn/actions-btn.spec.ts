import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsBtn } from './actions-btn';

describe('ActionsBtn', () => {
  let component: ActionsBtn;
  let fixture: ComponentFixture<ActionsBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown when trigger button is clicked', () => {
    const triggerBtn = fixture.nativeElement.querySelector('.trigger-btn');
    triggerBtn.click();
    fixture.detectChanges();
    expect(component.isDropdownOpen()).toBeTruthy();

    triggerBtn.click();
    fixture.detectChanges();
    expect(component.isDropdownOpen()).toBeFalsy();
  });

  it('should set isDropdownOpen to false when clicking outside', () => {
    component.isDropdownOpen.set(true);
    fixture.detectChanges();

    document.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.isDropdownOpen()).toBeFalsy();
  });

  it('should emit the selected action with the correct id', () => {
    vi.spyOn(component.selectedAction, 'emit');
    fixture.componentRef.setInput('buttonId', 'test-id');

    const triggerBtn = fixture.nativeElement.querySelector('.trigger-btn');
    triggerBtn.click();
    fixture.detectChanges();

    const editBtn = fixture.nativeElement.querySelector('.dropdown-item');
    editBtn.click();
    fixture.detectChanges();
    expect(component.selectedAction.emit).toHaveBeenCalledWith({ id: 'test-id', type: 'edit' });
  });
});
