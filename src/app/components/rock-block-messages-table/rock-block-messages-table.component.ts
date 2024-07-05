import {Component, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf, UpperCasePipe} from "@angular/common";
import {RockBlockMessagesService} from "../../services/rockblock-messages-service/rock-block-messages.service";
import {FormsModule} from "@angular/forms";
import {
  RockBlockMessageDetailsPopUpService
} from "../../services/pop-ups-services/rockblock-message-details-popup/rock-block-message-details-pop-up.service";


export interface RockBlockMessage {
  device: 'localizer' | 'drifter' | 'unknown';
  imei: string;
  serial: string;
  momsn: number;
  transmit_time: string;
  iridium_latitude: number;
  iridium_longitude: number;
  iridium_cep: number;
  data: string;
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
    DatePipe
  ],
  templateUrl: './rock-block-messages-table.component.html',
  styleUrl: './rock-block-messages-table.component.css',
  providers: [DatePipe]
})
export class RockBlockMessagesTableComponent implements OnInit {
  title: string = 'Iridium Message History';
  messages: RockBlockMessage[] = [];
  currentPage: number = 1;
  totalMessages: number = 0;
  totalPages: number = 1;
  rowsPerPage: number = 5;
  rowsOptions: number[] = [5, 10, 20, 50];

  constructor(private rockBlockMessagesService: RockBlockMessagesService,
              private rockBlockMessageDetailsPopUpService: RockBlockMessageDetailsPopUpService,
              private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.loadMessages();
    this.rockBlockMessagesService.onNewMessage().subscribe((newMessage) => {
      this.messages.unshift(newMessage);
      this.totalMessages++;
      this.calculateTotalPages();
    });
  }

  loadMessages() {
    this.rockBlockMessagesService.getMessages(this.currentPage, this.rowsPerPage).subscribe(response => {
      if (!response.success) {
        console.error('Failed to load messages: ' + response.error?.error_message);
        return;
      }
      this.messages = response.success.data;
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

  onMessageClick(message: RockBlockMessage) {
    console.log('Message clicked:', message);
    this.rockBlockMessageDetailsPopUpService.openMessage(message);
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
    const dateParts = transmitTime.split(' ');
    const date = dateParts[0].split('-');
    const time = dateParts[1].split(':');

    const year = parseInt(date[0], 10) + 2000;  // Assuming the year format is 'YY'
    const month = parseInt(date[1], 10) - 1;  // Months are 0-based in JavaScript
    const day = parseInt(date[2], 10);
    const hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);

    const parsedDate = new Date(year, month, day, hours, minutes);

    return this.datePipe.transform(parsedDate, 'MMM d, yyyy h:mm a') || '';
  }
}
