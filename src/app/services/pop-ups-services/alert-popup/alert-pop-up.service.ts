// popup.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface AlertPopUpState {
  message: string;
  type: 'success' | 'error';
  display: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertPopUpService {
  private popupStateSource = new BehaviorSubject<AlertPopUpState>({
    message: '',
    type: 'success',
    display: false
  });

  currentPopupState = this.popupStateSource.asObservable();

  showSuccessMessage(message: string) {
    this.showMessage(message, 'success');
  }

  showErrorMessage(message: string) {
    this.showMessage(message, 'error');
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.popupStateSource.next({ message, type, display: true });
  }

  hideMessage() {
    this.popupStateSource.next({ ...this.popupStateSource.value, display: false });
  }
}
