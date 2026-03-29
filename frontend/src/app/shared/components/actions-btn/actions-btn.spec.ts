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
});
