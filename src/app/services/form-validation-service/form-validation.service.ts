import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormValidationService  {
  private validationRequestSubject = new Subject<void>();
  private validationResponseSubject = new Subject<boolean>();

  constructor() {
    console.log("FormValidationService initialized")
  }

  getValidationRequest(): Observable<void> {
    return this.validationRequestSubject.asObservable();
  }

  requestValidation() {
    console.log("Requesting validation")
    this.validationRequestSubject.next();
  }

  validateForm(isValid: boolean) {
    this.validationResponseSubject.next(isValid);
  }


  getValidationResponse(): Observable<boolean> {
    return this.validationResponseSubject.asObservable();
  }

  resetValidation() {
    console.log("Resetting validation")
    this.validationResponseSubject.next(false);
  }
}
