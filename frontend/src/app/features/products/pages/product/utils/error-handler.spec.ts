import { getErrorMessage } from './error-handler';

describe('getErrorMessage', () => {
  const createMockForm = (controlName: string, errors: any = null) => ({
    get: (name: string) => {
      if (name === controlName) {
        return { errors };
      }
      return null;
    },
  });

  it('should return an ampty string if the control does not exist', () => {
    const form = createMockForm('name');
    const errorMessage = getErrorMessage('nonExistentControl', form);
    expect(errorMessage).toBe('');
  });

  it('should return an empty string if the control has no errors', () => {
    const form = createMockForm('name');
    const errorMessage = getErrorMessage('name', form);
    expect(errorMessage).toBe('');
  });

  it('should return the correct error message for a known error', () => {
    const form = createMockForm('name', { required: true });
    const errorMessage = getErrorMessage('name', form);
    expect(errorMessage).toBe('Este campo es requerido');
  });

  it('should return the text "Error desconocido" for an unknown error', () => {
    const form = createMockForm('name', { unknownError: true });
    const errorMessage = getErrorMessage('name', form);
    expect(errorMessage).toBe('Error desconocido');
  });
});
