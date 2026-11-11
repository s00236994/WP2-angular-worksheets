import { AbstractControl, ValidationErrors } from '@angular/forms';

// Fails if the value is a string made only of whitespace
export function notBlank(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (typeof value === 'string' && value.length > 0 && value.trim().length === 0) {
    return { blank: true };
  }
  return null;
}
