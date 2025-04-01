import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {AppRoutePaths} from "@/app/app.route.paths";
import {NgForOf, NgIf} from "@angular/common";
import {RegisterService} from "@/app/services/auth/register-service/register-service.service";
import {FormValidationService} from "@/app/services/shared/form-validation-service/form-validation.service";


@Component({
  selector: 'app-register-site',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    RouterOutlet,
    NgForOf,
    NgIf
  ],
  templateUrl: './register-site.component.html',
  styleUrl: './register-site.component.css'
})
export class RegisterSiteComponent implements OnInit {
  steps = [
    {label: 'Account', route: AppRoutePaths.auth.register.account},
    {label: 'Profile', route: AppRoutePaths.auth.register.profile},
  ];

  currentStep = 0;

  constructor(protected registerService: RegisterService,
              private formValidationService: FormValidationService,
              private router: Router
  ) {
    this.registerService.currentStep$.subscribe(
      (step) => {
        console.log("Step changed to: ", step)
        this.currentStep = step
      }
    );
  }

  ngOnInit() {
    // Set step based on the current route
    const currentRoute = this.router.url;
    const currentStep = this.steps.findIndex((step) => currentRoute.includes(step.route));
    if (currentStep !== -1) {
      this.registerService.setStep(currentStep);
    }
  }


  nextStep() {
    console.log("Next step clicked");
    this.formValidationService.resetValidation();

    const sub=  this.formValidationService.getValidationResponse()
      .subscribe(
        (isValid) => {
          if (!isValid) {
            console.log("Form is not valid-------->");
            return;
          }
          console.log("Form is valid-------->");
          this.registerService.setStep(((this.currentStep + 1) < this.steps.length) ? (this.currentStep + 1) : (this.currentStep));
          this.router.navigate([this.steps[this.currentStep].route]);
        }
      );

    this.formValidationService.requestValidation();
    sub.unsubscribe();

  }

  previousStep() {
    this.registerService.setStep(((this.currentStep - 1) >= 0) ? (this.currentStep - 1) : (this.currentStep));
    this.router.navigate([this.steps[this.currentStep].route]);
  }
}
