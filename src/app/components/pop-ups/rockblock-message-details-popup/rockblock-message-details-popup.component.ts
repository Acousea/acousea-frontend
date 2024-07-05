import { Component } from '@angular/core';
import {RockBlockMessage} from "../../rock-block-messages-table/rock-block-messages-table.component";
import {DecimalPipe, NgIf, UpperCasePipe} from "@angular/common";
import {
  RockBlockMessageDetailsPopUpService
} from "../../../services/pop-ups-services/rockblock-message-details-popup/rock-block-message-details-pop-up.service";

@Component({
  selector: 'app-rockblock-message-details-popup',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe,
    UpperCasePipe
  ],
  templateUrl: './rockblock-message-details-popup.component.html',
  styleUrl: './rockblock-message-details-popup.component.css'
})
export class RockblockMessageDetailsPopupComponent {
  message: RockBlockMessage | null = null;
  display: boolean = false;

  constructor(private messageDetailsPopupService: RockBlockMessageDetailsPopUpService) {}

  ngOnInit(): void {
    this.messageDetailsPopupService.currentMessage$.subscribe({
      next: message => {
        this.message = message;
        this.display = message !== null;
      },
      error: err => console.error('Error subscribing to message details:', err)
    });
  }

  closePopup(): void {
    this.messageDetailsPopupService.clearMessage();
  }

  protected readonly String = String;
}
