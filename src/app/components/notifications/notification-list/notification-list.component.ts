import {Component, OnInit} from '@angular/core';
import {NotificationComponent} from "../notification/notification.component";
import {NgForOf} from "@angular/common";
import {NotificationService} from "@/app/services/notification-service/notification.service";
import {Notification} from "@/app/services/notification-service/notification.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CdkDrag, CdkDragEnd, CdkDragMove} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [
    NotificationComponent,
    NgForOf,
    CdkDrag
  ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition(':enter, :leave', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];
  private audioFiles: { [key: string]: HTMLAudioElement };


  constructor(private notificationService: NotificationService) {
    this.audioFiles = {
      'info': new Audio('assets/sounds/info-notification-sound.mp3'),
      'success': new Audio('assets/sounds/success-notification-sound.mp3'),
      'warning': new Audio('assets/sounds/warning-notification-sound.mp3'),
      'error': new Audio('assets/sounds/error-notification-sound.mp3'),
    };
  }

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(notification => {
      console.log("Listened to notification: ", notification);
      this.notifications.push(notification);
      this.removeNotificationAfterTimeout(notification);
      this.playNotificationSound(notification.type); // Reproducir sonido al recibir una notificación
    });
  }

  playNotificationSound(type: string): void {
    const audio = this.audioFiles[type];
    if (audio) {
      audio.play().catch(error => {
        console.error("Error playing notification sound:", error);
      });
    }
  }

  onDragMove(event: CdkDragMove, notification: Notification): void {
    const offsetX = event.distance.x;
    if (offsetX < 0) {
      event.source.reset();
    } else {
      const opacity = Math.max(0, 1 - (offsetX / 200)); // Reduce opacity as it moves right, with a threshold of 200px
      event.source.element.nativeElement.style.opacity = opacity.toString();
    }

  }

  onDragEnd(event: CdkDragEnd, notification: Notification): void {
    const offsetX = event.distance.x;
    if (offsetX > 100) { // Arbitrary threshold to remove the notification
      this.notifications = this.notifications.filter(n => n !== notification);
    } else {
      event.source.reset();
      event.source.element.nativeElement.style.opacity = '1';
    }
  }

  private removeNotificationAfterTimeout(notification: Notification) {
    setTimeout(() => {
      this.notifications = this.notifications.filter(n => n !== notification);
    }, 5000);
  }
}
