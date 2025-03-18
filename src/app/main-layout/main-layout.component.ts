import {AfterViewInit, ChangeDetectorRef, Component, HostListener} from '@angular/core';

import {RouterOutlet} from "@angular/router";
import {SideMenuComponent} from "../components/shared/side-menu/side-menu.component";
import {AlertPopupComponent} from "../components/pop-ups/alert-popup/alert-popup.component";
import {
  NotificationListComponent
} from "../components/shared/notifications/notification-list/notification-list.component";
import {
  FlushRequestQueuePopupComponent
} from "../components/pop-ups/flush-request-queue-popup/flush-request-queue-popup.component";
import {UndoPopupComponent} from "../components/pop-ups/undo-popup/undo-popup.component";
import {LoadingAnimationComponent} from "../components/shared/addons/loading-animation/loading-animation.component";
import {LoadingAnimationService} from "../services/loading-animation-service/loading-animation.service";
import {Observable} from "rxjs";
import {NgClass} from "@angular/common";
import {map} from "rxjs/operators";
import {
  ServerConnectionStatusComponentComponent
} from "@/app/components/shared/server-connection-status-component/server-connection-status-component.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    SideMenuComponent,
    RouterOutlet,
    AlertPopupComponent,
    NotificationListComponent,
    FlushRequestQueuePopupComponent,
    UndoPopupComponent,
    LoadingAnimationComponent,
    ServerConnectionStatusComponentComponent,
    NgClass
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements AfterViewInit {
  isLoading: Observable<boolean>;
  isNotLoading: Observable<boolean>;
  isMenuCollapsed: boolean = true; // Estado inicial
  mainContentWidth: string = `${window.innerWidth - 60}px`; // Usa el tamaño real de la ventana

  constructor(private loadingService: LoadingAnimationService,
              private cdr: ChangeDetectorRef) {
    this.isLoading = this.loadingService.isLoading;
    this.isNotLoading = this.loadingService.isLoading.pipe(map(loading => !loading));
  }

  ngAfterViewInit() {
    this.isLoading.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  onMenuStateChanged(isCollapsed: boolean) {
    this.isMenuCollapsed = isCollapsed;
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const menuWidth = this.isMenuCollapsed ? 60 : 250;
    console.warn("menuWidth", menuWidth);
    console.warn("window.innerWidth", window.innerWidth);
    this.mainContentWidth = `${window.innerWidth - menuWidth}px`; // Usa el tamaño real de la ventana
  }
}
