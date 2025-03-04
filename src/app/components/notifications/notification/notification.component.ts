import {Component, Input} from '@angular/core';
import {Notification} from "@/app/services/notification-service/notification.service";
import {DatePipe, NgClass} from "@angular/common";

@Component({
    selector: 'app-notification',
    imports: [
        NgClass,
        DatePipe
    ],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() notification: Notification | undefined;

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
