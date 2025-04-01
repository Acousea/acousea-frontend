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
import {LoadingAnimationService} from "@/app/services/shared/loading-animation-service/loading-animation.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {
  ServerConnectionStatusComponentComponent
} from "@/app/components/shared/server-connection-status-component/server-connection-status-component.component";
import {
  LanguageSelectorComponent
} from "@/app/components/shared/side-menu/language-selector/language-selector.component";
import {ApplyDiscardPopupComponent} from "@/app/components/pop-ups/apply-discard-popup/apply-discard-popup.component";

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
    LanguageSelectorComponent,
    ApplyDiscardPopupComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements AfterViewInit {
  isLoading: Observable<boolean>;
  isNotLoading: Observable<boolean>;
  isMenuCollapsed: boolean = true; // Estado inicial
  mainContentWidth: string = `${document.documentElement.clientWidth - 60.0}px`; // Usa el tamaño real de la ventana

  constructor(private loadingService: LoadingAnimationService,
              private cdr: ChangeDetectorRef) {
    this.isLoading = this.loadingService.isLoading;
    this.isNotLoading = this.loadingService.isLoading.pipe(map(loading => !loading));
    // console.warn("document.documentElement.clientWidth", document.documentElement.clientWidth);
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
    const menuWidth = this.isMenuCollapsed ? 60.0 : 250.0;
    // console.warn("menuWidth", menuWidth);
    // console.warn("document.documentElement.clientWidth", document.documentElement.clientWidth);
    this.mainContentWidth = `${document.documentElement.clientWidth - menuWidth}px`; // Usa el tamaño real de la ventana
  }

  protected readonly console = console;
}
