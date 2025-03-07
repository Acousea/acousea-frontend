import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidationRule} from "../validation.rule";

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
})
export class PasswordInputComponent implements OnInit {
  @Input() label?: string; // Etiqueta opcional
  @Input() rightIcon: string = 'fa-eye'; // Ícono de ojo por defecto
  @Input() leftIcon?: string; // Ícono opcional a la izquierda
  @Input() value: string = ''; // Valor del input, usado con [(ngModel)]
  @Input() placeholder: string = ''; // Placeholder obligatorio
  @Input() validations: ValidationRule[] = []; // Reglas de validación

  @Output() valueChange = new EventEmitter<string>(); // Evento para comunicar el cambio del valor

  inputControl!: FormControl; // Control del formulario
  passwordFieldType: string = 'password'; // Estado inicial: campo de contraseña oculto

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const validators = this.validations.map(v => v.validator);
    this.inputControl = this.fb.control(this.value, validators);
    this.inputControl.valueChanges.subscribe(value => this.valueChange.emit(value));
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
