// src/app/register/register.service.ts
import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, firstValueFrom, Observable, of} from 'rxjs';
import {User, ValidateFieldResult} from "../user.interfaces";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {BackendRoutePaths} from "../../../app.route.paths";

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private currentStep = new BehaviorSubject<number>(0);
  currentStep$ = this.currentStep.asObservable();

  private userData: User = {
    id: '',
    username: '',
    password: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: new Date(),
    },
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    profileInfo: {
      preferredLanguage: '',
      profilePicture: ''
    }
  };


  constructor(
    private http: HttpClient
  ) {
  }

  requestUserRegistration(): Observable<boolean> {
    const url = BackendRoutePaths.user.register;
    return this.http.post<boolean>(url, this.userData).pipe(
      map(response => response || false),
      catchError(() => of(false))
    );
  }

  setStep(step: number) {
    this.currentStep.next(step);
  }

  getUserData(): User {
    return this.userData;
  }

  updateUser(param: Partial<User>) {
    this.userData = {...this.userData, ...param};
  }

  async validateUsername(username: string): Promise<ValidateFieldResult> {
    const url = BackendRoutePaths.user.validateUsername(username);
    console.log("VALIDATE USERNAME: URL: ", url)
    try {
      const response = await firstValueFrom(this.http.get<Boolean>(url));
      console.log("VALIDATE USERNAME: RESPONSE: ", response)
      if (response) {
        return {
          isValid: response.valueOf(),
          message: response ? 'Username is valid' : 'Username is already in use'
        };
      } else {
        return {isValid: false, message: 'Error validating username'};
      }
    } catch (error) {
      console.error("RegisterService::validateUsername() ERROR: ", error)
      return {isValid: false, message: 'Error validating username'};
    }
  }

  async validateEmail(email: string): Promise<ValidateFieldResult> {
    const url = BackendRoutePaths.user.validateEmail(email);
    console.log("VALIDATE EMAIL: URL: ", url)
    try {
      const response = await firstValueFrom(this.http.get<Boolean>(url));
      console.log("VALIDATE EMAIL: RESPONSE: ", response)
      if (response) {
        return {
          isValid: response.valueOf(),
          message: response ? 'Email is valid' : 'Email is already in use'
        };
      } else {
        return {isValid: false, message: 'Error validating email'};
      }

    } catch (error) {
      console.error("RegisterService::validateEmail() ERROR: ", error)
      return {isValid: false, message: 'Error validating email'};
    }
  }


}
