import {Component} from '@angular/core';
import {UndoPopupService} from "../../../services/pop-ups-services/undo-popup-service/undo-popup.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-undo-popup',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './undo-popup.component.html',
  styleUrl: './undo-popup.component.css'
})
export class UndoPopupComponent {
  message = 'Requesting changes...';
  display = false;
  timeoutId: any;

  constructor(private undoPopupService: UndoPopupService) {
    this.undoPopupService.notification$.subscribe(notification => {
      this.display = notification.display;

      if (this.display) {
        console.log("Timeout set to 4 seconds");
        this.timeoutId = setTimeout(() => {
          this.display = false;
          this.undoPopupService.confirm();
        }, 3000);
      }
    });
  }

  undo() {
    clearTimeout(this.timeoutId);
    console.log("Undoing changes...");
    this.display = false;
    this.undoPopupService.undo();
  }
}
