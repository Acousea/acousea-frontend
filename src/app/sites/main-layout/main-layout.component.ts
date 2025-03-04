import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';

import {RouterOutlet} from "@angular/router";
import {SideMenuComponent} from "../../components/side-menu/side-menu.component";
import {AlertPopupComponent} from "../../components/pop-ups/alert-popup/alert-popup.component";
import {NotificationListComponent} from "../../components/notifications/notification-list/notification-list.component";
import {
  FlushRequestQueuePopupComponent
} from "../../components/pop-ups/flush-request-queue-popup/flush-request-queue-popup.component";
import {UndoPopupComponent} from "../../components/pop-ups/undo-popup/undo-popup.component";
import {LoadingAnimationComponent} from "../../components/loading-animation/loading-animation.component";
import {LoadingAnimationService} from "../../services/loading-animation-service/loading-animation.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-main-layout',
    imports: [
        SideMenuComponent,
        RouterOutlet,
        AlertPopupComponent,
        NotificationListComponent,
        FlushRequestQueuePopupComponent,
        UndoPopupComponent,
        LoadingAnimationComponent,
        AsyncPipe
    ],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements AfterViewInit {
  isLoading: Observable<boolean>;
  isNotLoading: Observable<boolean>;

  constructor(private loadingService: LoadingAnimationService, private cdr: ChangeDetectorRef) {
    this.isLoading = this.loadingService.isLoading;
    this.isNotLoading = this.loadingService.isLoading.pipe(map(loading => !loading));
  }

  ngAfterViewInit() {
    this.isLoading.subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
