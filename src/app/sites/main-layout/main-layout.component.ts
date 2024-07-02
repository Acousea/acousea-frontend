import { Component } from '@angular/core';

import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../components/footer/footer.component";
import {SideMenuComponent} from "../../components/side-menu/side-menu.component";
import {AlertPopupComponent} from "../../components/pop-ups/alert-popup/alert-popup.component";
import {NotificationListComponent} from "../../components/notifications/notification-list/notification-list.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
    imports: [
        SideMenuComponent,
        RouterOutlet,
        FooterComponent,
        AlertPopupComponent,
        NotificationListComponent
    ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
