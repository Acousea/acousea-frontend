import {Component, OnInit} from '@angular/core';
import {DecimalPipe, NgForOf} from "@angular/common";
import {RockBlockMessagesService} from "../../services/rockblock-messages-service/rock-block-messages.service";
import {FormsModule} from "@angular/forms";


export interface RockBlockMessage {
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
    DecimalPipe
  ],
  templateUrl: './rock-block-messages-table.component.html',
  styleUrl: './rock-block-messages-table.component.css'
})
export class RockBlockMessagesTableComponent implements OnInit {
  title: string = 'Iridium Message History';
  messages: RockBlockMessage[] = [];
  currentPage: number = 1;
  totalMessages: number = 0;
  totalPages: number = 1;
  rowsPerPage: number = 10;
  rowsOptions: number[] = [10, 20, 50];

  constructor(private messageService: RockBlockMessagesService) {}

  ngOnInit() {
    this.loadMessages();
    this.messageService.onNewMessage().subscribe((newMessage) => {
      this.messages.unshift(newMessage);
      this.totalMessages++;
      this.calculateTotalPages();
    });
  }

  loadMessages() {
    this.messageService.getMessages(this.currentPage, this.rowsPerPage).subscribe(response => {
      if (!response.success) {
        console.error('Failed to load messages: ' + response.error?.error_message);
        return;
      }
      console.log("Messages loaded successfully")
      this.messages = response.success.data;
      this.totalMessages = response.success.total;
      this.calculateTotalPages();
    });
  }

  private calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalMessages / this.rowsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadMessages();
  }

  onRowsPerPageChange(rows: number) {
    this.rowsPerPage = rows;
    this.currentPage = 1;
    this.loadMessages();
  }
}
