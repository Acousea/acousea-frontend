import { Component } from '@angular/core';
import {UndoMessages, UndoPopupService} from '@/app/services/pop-ups/undo-popup-service/undo-popup.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-undo-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './undo-popup.component.html',
  styleUrls: ['./undo-popup.component.css']
})
export class UndoPopupComponent {
  message = UndoMessages.REQUESTING_CHANGES_MESSAGE;
  display = false;
  successMessage: string | null = null;
  timeoutId: any;

  constructor(private undoPopupService: UndoPopupService) {
    this.undoPopupService.notification$.subscribe(notification => {
      this.display = notification.display;
      this.message = notification.message || UndoMessages.REQUESTING_CHANGES_MESSAGE;

      if (this.display && !this.successMessage) {
        console.log('Timeout set to 4 seconds');
        this.timeoutId = setTimeout(() => {
          this.display = false;
          this.undoPopupService.confirm();
        }, 3000);
      }
    });

    this.undoPopupService.successMessage$.subscribe(message => {
      this.successMessage = message;
      this.display = true;

      setTimeout(() => {
        this.display = false;
        this.successMessage = null;
      }, 1500);
    });
  }

  undo() {
    clearTimeout(this.timeoutId);
    console.log('Undoing changes...');
    this.display = false;
    this.undoPopupService.undo();
  }
}
