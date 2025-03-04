import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {WavesSidebarComponent} from "../../../components/register-site/waves-sidebar/waves-sidebar.component";
import {AppRoutePaths} from "../../../app.route.paths";
import {AlertPopupComponent} from "../../../components/pop-ups/alert-popup/alert-popup.component";
import {LoadingAnimationComponent} from "../../../components/addons/loading-animation/loading-animation.component";

@Component({
  selector: 'app-auth-site',
  standalone: true,
  imports: [
    NgForOf,
    RouterLinkActive,
    RouterOutlet,
    WavesSidebarComponent,
    RouterLink,
    AlertPopupComponent,
    LoadingAnimationComponent
  ],
  templateUrl: './auth-site.component.html',
  styleUrl: './auth-site.component.css'
})
export class AuthSiteComponent {
  protected readonly AppRoutePaths = AppRoutePaths;
}
