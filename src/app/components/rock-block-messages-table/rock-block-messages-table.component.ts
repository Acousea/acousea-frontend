import {Component, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, NgStyle, UpperCasePipe} from "@angular/common";
import {MessagesService} from "../../services/rockblock-messages-service/messages.service";
import {FormsModule} from "@angular/forms";
import {
  MessageDetailsPopUpService
} from "../../services/pop-ups-services/rockblock-message-details-popup/message-details-pop-up.service";
import {OperationCode} from "../../global-interfaces/global-interfaces";


export interface Message {
  device: 'localizer' | 'drifter' | 'backend' | 'unknown';
  message_type: 'request' | 'response';
  sender_address: number;
  recipient_address: number;
  packet_type: number;
  communication_infrastructure: string;
  transmit_time: string;
  opcode: string;
  data: string;
  error: boolean;
  error_code: number;
  error_description: string;
}


@Component({
  selector: 'app-rock-block-messages-table',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    DecimalPipe,
    UpperCasePipe,
    NgClass,
    DatePipe,
    NgStyle,
    NgIf
  ],
  templateUrl: './rock-block-messages-table.component.html',
  styleUrl: './rock-block-messages-table.component.css',
  providers: [DatePipe]
})
export class RockBlockMessagesTableComponent implements OnInit {
  title: string = '';
  messages: Message[] = [];
  currentPage: number = 1;
  totalMessages: number = 0;
  totalPages: number = 1;
  rowsPerPage: number = 5;
  rowsOptions: number[] = [5, 10, 20, 50];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';


  constructor(private messagesService: MessagesService,
              private messageDetailsPopUpService: MessageDetailsPopUpService,
              private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.loadMessages();
    this.messagesService.onNewMessage().subscribe((newMessage) => {
      this.messages.unshift(newMessage);
      this.totalMessages++;
      this.calculateTotalPages();
    });
  }

  loadMessages() {
    this.messagesService.getMessages(this.currentPage, this.rowsPerPage).subscribe(response => {
      if (!response.success) {
        console.error('Failed to load messages: ' + response.error?.error_message);
        return;
      }
      this.messages = response.success.data;
      console.log("Messages: ", this.messages);
      this.totalMessages = response.success.total;
      this.calculateTotalPages();
    });
  }

  private calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalMessages / this.rowsPerPage);
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadMessages();
  }

  onRowsPerPageChange(rows: number) {
    this.rowsPerPage = rows;
    this.currentPage = 1;
    this.loadMessages();
  }

  onMessageClick(message: Message) {
    console.log('Message clicked:', message);
    this.messageDetailsPopUpService.openMessage(message);
  }

  getPaginationButtons(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(this.currentPage - halfRange, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, this.totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  formatTransmitTime(transmitTime: string): string {
    // Convert the string to a Date object
    const dateParts = transmitTime.split('T');
    const date = dateParts[0].split('-');
    const time = dateParts[1].split(':');

    const year = parseInt(date[0], 10);  // Year in YYYY format
    const month = parseInt(date[1], 10) - 1;  // Months are 0-based in JavaScript
    const day = parseInt(date[2], 10);
    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const parsedDate = new Date(year, month, day, hours, minutes);

    return this.datePipe.transform(parsedDate, 'MMM d, yyyy h:mm a') || '';
  }

  getOperationDescription(opcode: string): string {
    return OperationCode.getDescription(opcode);
  }

  getOperationColor(opcode: string): string {
    return OperationCode.getColor(opcode);
  }

  getOperationBackgroundColor(opcode: string): string {
    const color = this.getOperationColor(opcode);
    return color.replace(/[\d.]+\)$/g, '0.25)');
  }

  getDeviceImage(device: string): string {
    switch (device) {
      case 'drifter':
        return 'assets/icons/buoy.svg';
      case 'localizer':
        return 'assets/icons/compass.svg';
      case 'backend':
        return 'assets/icons/backend-icon.png';
      default:
        return 'assets/icons/unknown-icon.png';
    }
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortMessages();
  }

  private sortMessages() {
    this.messages.sort((a: Message, b: Message) => {
      let comparison = 0;
      const sortColumn = this.sortColumn as keyof Message;

      if (a[sortColumn] > b[sortColumn]) {
        comparison = 1;
      } else if (a[sortColumn] < b[sortColumn]) {
        comparison = -1;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

}
