import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth-service/auth.service";
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {AppRoutePaths} from "../../../app.route.paths";

@Component({
  selector: 'app-login-site',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './login-site.component.html',
  styleUrl: './login-site.component.css'
})
export class LoginSiteComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password);
    this.router.navigate([AppRoutePaths.fullPath(AppRoutePaths.summary)]);
  }

  protected readonly AppRoutePaths = AppRoutePaths;
}
