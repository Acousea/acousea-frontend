import {Component, Input, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-pam-device-status',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './pam-device-status.component.html',
  styleUrl: './pam-device-status.component.css'
})
export class PamDeviceStatusComponent implements OnInit {
  @Input() statusCode: number = 0;
  statusText: string = '';
  statusColor: string = '';
  statusIcon: string = '';
  borderColor: string = '';

  ngOnInit(): void {
    this.updateStatus();
  }

  updateStatus(): void {
    this.statusCode=1;
    switch (this.statusCode) {
      case 0:
        this.statusText = 'READY';
        this.statusColor = 'rgba(0,200,83,0.1)'; // Green
        this.borderColor = 'rgba(0,200,83,0.9)'; // Green
        this.statusIcon = 'assets/icons/pam-status-icons/green-tick.svg';
        break;
      case 1:
        this.statusText = 'DATA_ACQUISITION_NOT_READY';
        this.statusColor = 'rgba(255,235,59,0.1)'; // Yellow
        this.borderColor = 'rgba(203,171,0,0.9)'; // Yellow
        this.statusIcon = 'assets/icons/pam-status-icons/yellow-data-card.svg';
        break;
      case 2:
        this.statusText = 'NOT_READY';
        // Rgba
        this.statusColor = 'rgba(255,235,59,0.1)'; // Yellow
        this.borderColor = 'rgba(203,171,0,0.9)'; // Yellow
        this.statusIcon = 'assets/icons/pam-status-icons/yellow-triangle-warning.svg';
        break;
      case 3:
        this.statusText = 'START_UP_CONFIGURATION_FAILED';
        this.statusIcon = 'assets/icons/pam-status-icons/red-triangle-warning.svg';
        this.statusColor = 'rgba(219,36,25,0.1)'; // Red
        this.borderColor = 'rgba(219,36,25,0.9)'; // Red
        break;
      case 4:
        this.statusText = 'BAUD_RATE_RECONFIGURING';
        this.statusColor = 'rgba(33,150,243,0.1)'; // Blue
        this.borderColor = 'rgba(33,150,243,0.9)'; // Blue
        this.statusIcon = 'assets/icons/pam-status-icons/rotating-blue-wheel.svg';
        break;
      case 5:
        this.statusText = 'FILE_SYSTEM_FAULT';
        this.statusColor = 'rgba(219,36,25,0.1)'; // Red
        this.borderColor = 'rgba(219,36,25,0.9)'; // Red
        this.statusIcon = 'assets/icons/pam-status-icons/red-data-card.svg';
        break;
      case 6:
        this.statusText = 'OFFLINE';
        this.statusColor = 'rgba(158,158,158,0.1)'; // Grey
        this.borderColor = 'rgba(125,125,125,0.9)'; // Grey
        this.statusIcon = 'assets/icons/pam-status-icons/gray-switch.svg';
        break;
      default:
        this.statusText = 'UNKNOWN';
        this.statusColor = 'rgba(0,0,0,0.1)'; // Black
        this.borderColor = 'rgba(0,0,0,0.9)'; // Black
        this.statusIcon = 'assets/icons/pam-status-icons/unknown.svg';
        break;
    }
  }
}
