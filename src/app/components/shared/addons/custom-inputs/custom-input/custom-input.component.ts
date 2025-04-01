import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidateFieldResult} from "@/app/services/auth/user.interfaces";
import {ValidationRule} from "../validation.rule";

export interface FieldContent {
  value: any;
  isValid: boolean;
}

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'] // Corregí 'styleUrl' a 'styleUrls'
})
export class CustomInputComponent implements OnInit {
  @Input() label?: string;
  @Input() rightIcon?: string;
  @Input() leftIcon?: string;
  @Input() inputType: 'text' | 'password' | 'date' = 'text';
  @Input() content: FieldContent = {value: '', isValid: false};
  @Input() placeholder: string = '';
  @Input() validationRules: ValidationRule[] = []; // Reglas de validación
  @Input() validationFunctions: ((value: string) => Promise<ValidateFieldResult> | ValidateFieldResult)[] = []; // Funciones de validación personalizadas
  @Input() successMessage: string = ''; // Mensaje de éxito

  @Output() contentChange: EventEmitter<FieldContent> = new EventEmitter<FieldContent>(); // Emisor de eventos para el enlace bidireccional

  inputControl!: FormControl; // Control del formulario

  constructor(private fb: FormBuilder) {
  }

  getCustomErrors(): string[] {
    return Object.keys(this.inputControl.errors || {}).filter(key => key === 'custom');
  }

  ngOnInit(): void {
    const validators = this.validationRules.map(v => v.validator);
    this.inputControl = this.fb.control(this.content.value, validators);

    // Emitir el cambio de valor para sincronizar con el padre
    this.inputControl.valueChanges.subscribe(async (value) => {

      this.content = {value: value, isValid: this.inputControl.valid};
      console.log("Value changed: ", value)
      console.log("Emitted content: ", this.content)
      this.contentChange.emit(this.content); // Emitir el nuevo valor hacia el componente padre

      if (this.content.value === '') {
        return;
      }
      // Ejecutar las funciones de validación personalizadas
      for (const func of this.validationFunctions) {
        const validationResult = await func(value); // Esperar el resultado si es Promise
        console.log("Validation result: ", validationResult)
        if (!validationResult.isValid) {
          this.inputControl.setErrors({
            ...this.inputControl.errors,
            custom: validationResult.message
          });
        } else {
          this.successMessage = validationResult.message;
        }
      }
    });
  }

}
