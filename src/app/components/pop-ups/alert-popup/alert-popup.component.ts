import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {AlertPopUpService} from "@/app/services/pop-ups/alert-popup/alert-pop-up.service";


@Component({
  selector: 'app-alert-popup',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './alert-popup.component.html',
  styleUrl: './alert-popup.component.css'
})
export class AlertPopupComponent {
  message: string = '';
  type: 'success' | 'error' = 'success';
  display: boolean = false;

  constructor(private popupService: AlertPopUpService) {
    this.popupService.currentPopupState.subscribe(state => {
      this.message = state.message;
      this.type = state.type;
      this.display = state.display;
    });
  }

  closePopup() {
    this.popupService.hideMessage();
  }
}
