import {Injectable} from '@angular/core';
import {distinctUntilChanged, filter, Observable, of, Subject} from 'rxjs';
import {WebSocketService} from "@/app/services/real-time/websocket-service/websocket.service";
import {catchError, merge} from "rxjs/operators";
import {Notification} from "@/app/global-interfaces/notification/notification.interface";
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification.Interface>();
  private readonly _notifications$: Observable<Notification.Interface>;

  mockNotifications: Notification.Interface[] = [
    Notification.info('This is an info message'),
    Notification.success('This is a success message'),
    Notification.warning('This is a warning message'),
    Notification.error('This is an error message'),

  ];

  constructor(private wsService: WebSocketService) {
    // Combine both WebSocket notifications and local notifications
    this._notifications$ = this.wsService.subscribeToMessageType<Notification.Interface>('notification').pipe(
      // Merge with local notifications
      merge(this.notificationSubject.asObservable()),
      // Distinct by ID to avoid duplicates
      distinctUntilChanged((prev, curr) => prev.id === curr.id),
      // Filter out any unwanted notifications
      filter(notification => notification.type !== undefined && notification.message !== undefined),
      // Handle errors if needed
      catchError(error => {
        console.error('Error in notification stream:', error);
        return of(); // Return an empty array on error
      }
    ));


  }

  // Method to push a notification locally
  pushNotification(notification: Notification.Interface) {
    // Add date if not provided
    if (!notification.date) {
      notification.date = new Date();
    }
    // Generate ID if not provided
    if (notification.id === undefined) {
      notification.id = uuidv4();
    }
    this.notificationSubject.next(notification);
  }

  get notifications$(): Observable<Notification.Interface> {
    return this._notifications$;
  }

  simulateNotifications() {
    this.mockNotifications.forEach((notification, index) => {
      setTimeout(() => {
        this.pushNotification(notification);
        // Also send via WebSocket if needed
        this.wsService.sendMessage({
          type: 'notification',
          payload: notification
        });
      }, index * 500);
    });
  }
}
