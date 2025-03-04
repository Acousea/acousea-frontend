import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from '@/environments/environment';

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
  private socket$: WebSocketSubject<Notification>;
  private notificationsSubject = new Subject<Notification>();
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

  constructor() {
    this.socket$ = webSocket(`${environment.webSocketUrl}/${environment.apiVersion}/ws/notifications`);
    this.socket$.subscribe(
      (notification: Notification) => this.notificationsSubject.next(notification),
      err => console.error(err)
    );

    // Wait for 3 seconds before sending the notifications
    // setTimeout(() => {
    //   this.simulateNotifications();
    // }, 3000);
  }

  simulateNotifications() {
    // Wait for 2 seconds between sending each notification
    this.mockNotifications.forEach((notification, index) => {
      setTimeout(() => {
        this.notificationsSubject.next(notification);
      }, index * 2000);
    });
  }

  get notifications$(): Observable<Notification> {
    return this.notificationsSubject.asObservable();
  }
}
