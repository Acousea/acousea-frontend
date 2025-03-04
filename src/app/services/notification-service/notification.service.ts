import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {BackendRoutePaths} from "../../app.route.paths";

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
    this.socket$ = webSocket(BackendRoutePaths.websocket.notifications);
    this.socket$.subscribe({
      next: (notification: Notification) => {
        console.log("Received notification: ", notification);
        this.notificationsSubject.next(notification);
      },
      error: (error) => {
        console.error("Error receiving notification: ", error);
      },
      complete: () => {
        console.log("Connection closed");
      }
    });

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
      }, index * 500);
    });
  }

  get notifications$(): Observable<Notification> {
    return this.notificationsSubject.asObservable();
  }
}
