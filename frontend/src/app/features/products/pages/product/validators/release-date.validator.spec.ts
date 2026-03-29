import { AbstractControl } from '@angular/forms';
import { futureDateValidator } from './release-date.validator';

describe('futureDateValidator', () => {
  it('should return null if the date is empty', () => {
    const validator = futureDateValidator();
    const control = { value: '' } as AbstractControl;
    expect(validator(control)).toBeNull();
  });

  it('should return null if the date is in the future', () => {
    const validator = futureDateValidator();
    const control = { value: '2099-12-31' } as AbstractControl;
    expect(validator(control)).toBeNull();
  });

  it('should return an error "invalidDate" if the date is in the past', () => {
    const validator = futureDateValidator();
    const control = { value: '2000-01-01' } as AbstractControl;
    expect(validator(control)).toEqual({ invalidDate: true });
  });
});
