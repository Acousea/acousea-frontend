import {Component, Input} from '@angular/core';
import {DatePipe, NgClass} from "@angular/common";
import {Notification} from "@/app/global-interfaces/notification/notification.interface";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgClass,
    DatePipe
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() notification: Notification.Interface | undefined;

  constructor() {}

  getIcon(): string {
    switch (this.notification?.type) {
      case 'info': return 'fa-solid fa-circle-info';
      case 'success': return 'fa-solid fa-circle-check';
      case 'warning': return 'fa-solid fa-triangle-exclamation';
      case 'error': return 'fa-solid fa-circle-xmark';
      default: return '';
    }
  }




}
