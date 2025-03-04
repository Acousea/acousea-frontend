import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {WebSocketService} from "@/app/services/websocket-service/websocket.service";

export interface Notification {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  id?: number; // Optional for tracking notifications
  date: Date;
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly _notifications$: Observable<Notification>;
  mockNotifications: Notification[] = [

    {
      type: 'info',
      message: 'This is an info message',
      date: new Date()
    },
    {
      type: 'success',
      message: 'This is a success message',
      date: new Date()
    },
    {
      type: 'warning',
      message: 'This is a warning message',
      date: new Date()
    },
    {
      type: 'error',
      message: 'This is an error message',
      date: new Date()
    }
  ];


  constructor(private wsService: WebSocketService) {
    this._notifications$ = this.wsService.subscribeToMessageType<Notification>('notification');
    // Wait for 3 seconds before sending the notifications
    // setTimeout(() => {
    //   this.simulateNotifications();
    // }, 3000);
  }


  get notifications$(): Observable<Notification> {
    return this._notifications$;
  }

  simulateNotifications() {
    // Wait for 2 seconds between sending each notification
    this.mockNotifications.forEach((notification, index) => {
      setTimeout(() => {
        this.mockNotifications.forEach((notification: Notification) => this.wsService.sendMessage({
          type: 'notification',
          payload: notification
        }));
      }, index * 500);
    });
  }

}
