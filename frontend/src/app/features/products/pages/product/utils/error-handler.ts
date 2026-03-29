const errorMessages: { [key: string]: { [key: string]: string } } = {
  id: {
    required: 'Este campo es requerido',
    minlength: 'El ID debe tener al menos 3 caracteres',
    maxlength: 'El ID debe tener como máximo 10 caracteres',
    productIdExists: 'El ID ya existe, por favor elija otro',
  },
  name: {
    required: 'Este campo es requerido',
    minlength: 'El nombre debe tener al menos 5 caracteres',
    maxlength: 'El nombre debe tener como máximo 100 caracteres',
  },
  description: {
    required: 'Este campo es requerido',
    minlength: 'La descripción debe tener al menos 10 caracteres',
    maxlength: 'La descripción debe tener como máximo 200 caracteres',
  },
  logo: {
    required: 'Este campo es requerido',
  },
  date_release: {
    required: 'Este campo es requerido',
    invalidDate: 'La fecha debe ser igual o mayor a la fecha actual',
  },
  date_revision: {
    required: 'Este campo es requerido',
    invalidDate: 'La fecha debe ser exactamente un año posterior a la fecha de liberación',
  },
};

export const getErrorMessage = (controlName: string, form: any): string => {
  const control = form.get(controlName);

  if (!control || !control.errors) return '';

  const errorKey = Object.keys(control.errors)[0];

  return errorMessages[controlName]?.[errorKey] || 'Error desconocido';
};
