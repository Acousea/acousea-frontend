import {Component} from '@angular/core';
import {FormsModule, Validators} from "@angular/forms";

import {
  CustomInputComponent,
  FieldContent
} from "@/app/components/shared/addons/custom-inputs/custom-input/custom-input.component";
import {ValidationRule} from "@/app/components/shared/addons/custom-inputs/validation.rule";
import {AuthService} from "@/app/services/auth/auth.service";

@Component({
  selector: 'app-login-site',
  standalone: true,
  imports: [
    CustomInputComponent,
    FormsModule
  ],
  templateUrl: './login-site.component.html',
  styleUrls: ['./login-site.component.css']
})
export class LoginSiteComponent {

  userPassword: FieldContent = {value: '', isValid: false};
  usernameOrEmail: FieldContent = {value: '', isValid: false};

  passwordValidations: ValidationRule[] = [
    {name: 'required', validator: Validators.required, message: 'Password is required'},
    {name: 'minlength', validator: Validators.minLength(6), message: 'Password must be at least 6 characters long'},
  ];

  usernameValidations: ValidationRule[] = [
    {name: 'required', validator: Validators.required, message: 'Username or Email is required'}
  ];

  constructor(private authService: AuthService) {

  }

  submitForm() {
    console.log("Submitting form")
    console.log("Username or Email: " + this.usernameOrEmail)
    console.log("Password: " + this.userPassword)
    if (!(this.usernameOrEmail.isValid && this.userPassword.isValid)) {
      console.error("Login Form is invalid");
      return;
    }
    this.authService.login(this.usernameOrEmail.value, this.userPassword.value);
  }
}
