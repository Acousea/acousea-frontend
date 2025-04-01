import {Component} from '@angular/core';
import {RegisterStepComponent} from "../register-step-component.interface";
import {CustomInputComponent, FieldContent} from "../../shared/addons/custom-inputs/custom-input/custom-input.component";
import {RegisterService} from "@/app/services/auth/register-service/register-service.service";
import {ValidationRule} from "../../shared/addons/custom-inputs/validation.rule";
import {FormValidationService} from "@/app/services/shared/form-validation-service/form-validation.service";
import {ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-step1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomInputComponent
  ],
  templateUrl: './register-step-account.component.html',
  styleUrls: ['../register-steps-components.css']
})
export class RegisterStepAccountComponent implements RegisterStepComponent {
  username: FieldContent = {value: '', isValid: false};
  email: FieldContent = {value: '', isValid: false};
  userPassword: FieldContent = {value: '', isValid: false};

  passwordValidations: ValidationRule[] = [
    {name: 'required', validator: Validators.required, message: 'Password is required'},
    {name: 'minlength', validator: Validators.minLength(6), message: 'Password must be at least 6 characters long'},
  ];

  usernameValidations: ValidationRule[] = [
    {name: 'required', validator: Validators.required, message: 'Username or Email is required'}
  ];

  emailValidations: ValidationRule[] = [
    {name: 'required', validator: Validators.required, message: 'Email is required'},
    {name: 'email', validator: Validators.email, message: 'Email is invalid'}
  ];

  constructor(
    protected registerService: RegisterService,
    private formValidationService: FormValidationService
  ) {
    this.formValidationService.getValidationRequest().subscribe(() => {
      console.log("Validating form")
      if (!this.validateFields()) {
        console.log("Form is invalid: Fields: ", this.username, this.email, this.userPassword)
        this.formValidationService.validateForm(false);
        return;
      }
      this.registerService.updateUser({
        username: this.username.value,
        password: this.userPassword.value,
        personalInfo: {
          ...registerService.getUserData().personalInfo,
          email: this.email.value
        }
      });
      this.formValidationService.validateForm(true);
    });
  }

  private validateFields() {
    return this.username.isValid && this.email.isValid && this.userPassword.isValid;
  }
}
