import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-pam-device-status',
    imports: [],
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
    switch (this.statusCode) {
      case 0:
        this.statusText = 'Ready';
        this.statusColor = 'rgba(0,200,83,0.1)'; // Green
        this.borderColor = 'rgba(0,200,83,0.5)'; // Green
        this.statusIcon = 'assets/icons/pam-status-icons/green-tick.svg';
        break;
      case 1:
        this.statusText = 'Data Acquisition Not Ready';
        this.statusColor = 'rgba(255,235,59,0.1)'; // Yellow
        this.borderColor = 'rgba(255,235,59,0.5)'; // Yellow
        this.statusIcon = 'assets/icons/pam-status-icons/yellow-data-card.svg';
        break;
      case 2:
        this.statusText = 'Not Ready';
        // Rgba
        this.statusColor = 'rgba(255,235,59,0.1)'; // Yellow
        this.borderColor = 'rgba(255,235,59,0.5)'; // Yellow
        this.statusIcon = 'assets/icons/pam-status-icons/yellow-triangle-warning.svg';
        break;
      case 3:
        this.statusText = 'Start-up Configuration Failed';
        this.statusIcon = 'assets/icons/pam-status-icons/red-triangle-warning.svg';
        this.statusColor = 'rgba(219,36,25,0.1)'; // Red
        this.borderColor = 'rgba(219,36,25,0.5)'; // Red
        break;
      case 4:
        this.statusText = 'Baud Rate Reconfiguring';
        this.statusColor = 'rgba(33,150,243,0.1)'; // Blue
        this.borderColor = 'rgba(33,150,243,0.5)'; // Blue
        this.statusIcon = 'assets/icons/pam-status-icons/rotating-blue-wheel.svg';
        break;
      case 5:
        this.statusText = 'File System Fault';
        this.statusColor = 'rgba(219,36,25,0.1)'; // Red
        this.borderColor = 'rgba(219,36,25,0.5)'; // Red
        this.statusIcon = 'assets/icons/pam-status-icons/red-data-card.svg';
        break;
      case 6:
        this.statusText = 'Off';
        this.statusColor = 'rgba(158,158,158,0.1)'; // Grey
        this.borderColor = 'rgba(158,158,158,0.5)'; // Grey
        this.statusIcon = 'assets/icons/pam-status-icons/gray-switch.svg';
        break;
      default:
        this.statusText = 'Unknown';
        this.statusColor = 'rgba(0,0,0,0.1)'; // Black
        this.borderColor = 'rgba(0,0,0,0.5)'; // Black
        this.statusIcon = 'assets/icons/pam-status-icons/unknown.svg';
        break;
    }
  }
}
