import { Component, OnInit } from '@angular/core';

import { NgClass, NgIf } from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ServerConnectionStatusService} from "@/app/services/server-connection-service/server-connection-status.service";

@Component({
  selector: 'app-server-connection-status-component',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    TranslateModule
  ],
  templateUrl: './server-connection-status-component.component.html',
  styleUrl: './server-connection-status-component.component.css'
})
export class ServerConnectionStatusComponentComponent implements OnInit {
  status: {
    topNotificationDisplayed: boolean,
    isConnected: boolean,
    showReconnectedMessage: boolean
  } = {
    topNotificationDisplayed: false,
    isConnected: true,
    showReconnectedMessage: false
  };

  constructor(private serverConnectionStatusService: ServerConnectionStatusService) {}

  ngOnInit(): void {
    this.serverConnectionStatusService.connected$.subscribe((isConnected) => {

      if (isConnected && !this.status.isConnected) {
        // Connection was just restored
        this.status.showReconnectedMessage = true;
        this.status.topNotificationDisplayed = true;

        setTimeout(() => {
          this.status.showReconnectedMessage = false;
          this.status.topNotificationDisplayed = false; // Hide notification after 3 seconds
        }, 3000);
      }

      this.status.isConnected = isConnected;

      if (!isConnected) {
        this.status.topNotificationDisplayed = false; // Reset to fullscreen when connection is lost
      }
    });
  }

  acknowledge() {
    this.status.topNotificationDisplayed = true;
  }
}
