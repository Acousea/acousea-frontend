import { Component } from '@angular/core';
import {Message} from "../../rock-block-messages-table/rock-block-messages-table.component";
import {DatePipe, NgIf} from "@angular/common";
import {
  MessageDetailsPopUpService
} from "@/app/services/pop-ups/rockblock-message-details-popup/message-details-pop-up.service";
import {OperationCode} from "@/app/global-interfaces/global.interface";

@Component({
  selector: 'app-rockblock-message-details-popup',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './rockblock-message-details-popup.component.html',
  styleUrl: './rockblock-message-details-popup.component.css'
})
export class RockblockMessageDetailsPopupComponent {
  message: Message | null = null;
  display: boolean = false;

  constructor(private messageDetailsPopupService: MessageDetailsPopUpService) {}

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
  protected readonly OperationCode = OperationCode;
}
