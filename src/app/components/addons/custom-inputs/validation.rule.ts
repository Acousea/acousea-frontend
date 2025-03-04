export interface ValidationRule {
  name: string; // Nombre de la validación (e.g., 'required', 'minlength')
  validator: any; // El validador asociado (e.g., Validators.required, Validators.minLength(6))
  message: string; // Mensaje de error a mostrar si la validación falla
}
