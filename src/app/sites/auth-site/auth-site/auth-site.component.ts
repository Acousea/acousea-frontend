import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {WavesSidebarComponent} from "@/app/components/auth-site/waves-sidebar/waves-sidebar.component";
import {AppRoutePaths} from "@/app/routes/app.route.paths";
import {LoadingAnimationComponent} from "@/app/components/shared/addons/loading-animation/loading-animation.component";

@Component({
  selector: 'app-auth-site',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterOutlet,
    WavesSidebarComponent,
    RouterLink,
    LoadingAnimationComponent
  ],
  templateUrl: './auth-site.component.html',
  styleUrl: './auth-site.component.css'
})
export class AuthSiteComponent {
  protected readonly AppRoutePaths = AppRoutePaths;
}
