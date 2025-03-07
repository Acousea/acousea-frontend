import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {WavesSidebarComponent} from "@/app/components/register-site/waves-sidebar/waves-sidebar.component";
import {AppRoutePaths} from "@/app/app.route.paths";
import {AlertPopupComponent} from "@/app/components/pop-ups/alert-popup/alert-popup.component";
import {LoadingAnimationComponent} from "@/app/components/shared/addons/loading-animation/loading-animation.component";

@Component({
  selector: 'app-auth-site',
  standalone: true,
  imports: [
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
