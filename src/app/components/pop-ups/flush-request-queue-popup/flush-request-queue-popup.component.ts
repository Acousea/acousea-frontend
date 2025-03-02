import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {AlertPopUpService} from "../../../services/pop-ups-services/alert-popup/alert-pop-up.service";
import {
  FlushRequestQueuePopupService
} from "../../../services/pop-ups-services/flush-request-queue-popup/flush-request-queue-popup.service";

@Component({
  selector: 'app-flush-request-queue-popup',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './flush-request-queue-popup.component.html',
  styleUrl: './flush-request-queue-popup.component.css'
})
export class FlushRequestQueuePopupComponent {
  message: string = 'There is an unresolved request for this operation in the queue. Do you want to flush the queue?';
  boldMessage: string = 'Take in mind that this operation cancels all the non resolved sent requests.';
  display: boolean = false;

  constructor(private flushRequestQueuePopupService: FlushRequestQueuePopupService) {
    this.flushRequestQueuePopupService.currentPopupState.subscribe(state => {
      this.display = state.display;
    });
  }

  closePopup() {
    this.flushRequestQueuePopupService.hidePopUp();
  }

  flushRequestQueue() {
    // Flush the request queue
    this.flushRequestQueuePopupService.flushRequestQueue();
  }

  discardChanges() {
    this.closePopup();
  }
}
