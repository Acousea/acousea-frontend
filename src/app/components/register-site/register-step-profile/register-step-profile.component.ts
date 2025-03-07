import {Component} from '@angular/core';
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterStepComponent} from "../register-step-component.interface";
import {NgIf} from "@angular/common";
import {AddressSelectorComponent} from "../address-selector/address-selector.component";
import {LanguageSelectorComponent} from "../../shared/side-menu/language-selector/language-selector.component";
import {CustomInputComponent, FieldContent} from "../../shared/addons/custom-inputs/custom-input/custom-input.component";
import {RegisterService} from '@/app/services/auth-service/register-service/register-service.service';
import {AVAILABLE_LANGUAGES, Language} from "@/app/services/language-service/language.service";
import {ValidationRule} from "../../shared/addons/custom-inputs/validation.rule";
import {FormValidationService} from "@/app/services/form-validation-service/form-validation.service";

@Component({
  selector: 'app-register-step2-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AddressSelectorComponent,
    LanguageSelectorComponent,
    CustomInputComponent
  ],
  templateUrl: './register-step-profile.component.html',
  styleUrls: ['../register-steps-components.css']
})
export class RegisterStepProfileComponent implements RegisterStepComponent {

  firstName: FieldContent = {value: '', isValid: false};
  lastName: FieldContent = {value: '', isValid: false};
  phone: FieldContent = {value: '', isValid: false};
  dateOfBirth: FieldContent = {value: '', isValid: false};
  address: string = '';
  selectedImage: string | null = null;
  preferredLanguage: Language = AVAILABLE_LANGUAGES[0];

  firstNameValidations: ValidationRule[] = [
    {name: 'required', validator: Validators.required, message: 'First name is required'}
  ];

  lastNameValidations: ValidationRule[] = [
    {name: 'required', validator: Validators.required, message: 'Last name is required'}
  ];

  phoneValidations: ValidationRule[] = [
    {name: 'required', validator: Validators.required, message: 'Phone number is required'}
  ];

  dobValidations: ValidationRule[] = [
    {name: 'required', validator: Validators.required, message: 'Date of birth is required'}
  ];


  constructor(
    private registerService: RegisterService,
    private formValidationService: FormValidationService
  ) {
    this.formValidationService.getValidationRequest()
      .subscribe(
      () => {
        // Check if the current form is valid
        if (!this.validateFields()) {
          this.formValidationService.validateForm(false);
          return;
        }
        this.registerService.updateUser(
          {
            personalInfo: {
              firstName: this.firstName.value,
              email: this.registerService.getUserData().personalInfo.email,
              lastName: this.lastName.value,
              phoneNumber: this.phone.value,
              dateOfBirth: new Date(this.dateOfBirth.value)
            }
          }
        );
        this.formValidationService.validateForm(true);
      });
  }


  onSelectImage() {
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    fileInput.click();
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        this.registerService.updateUser({
          profileInfo: {
            profilePicture: this.selectedImage,
            preferredLanguage: this.preferredLanguage.code
          }
        });

      };
      reader.readAsDataURL(file);
    }
  }

  getInitial(): string {
    return this.firstName.value.charAt(0).toUpperCase() || '';
  }

  private validateFields() {
    return [this.firstName, this.lastName, this.phone, this.dateOfBirth].every(field => field.isValid);
  }

}
