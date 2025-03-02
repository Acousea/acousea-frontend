import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth-service/auth.service";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {AppRoutePaths} from "../../../app.route.paths";

@Component({
  selector: 'app-register-site',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './register-site.component.html',
  styleUrl: './register-site.component.css'
})
export class RegisterSiteComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Aquí deberías implementar la lógica para registrar al usuario
    this.authService.register(this.username, this.email, this.password);
    this.router.navigate([AppRoutePaths.fullPath(AppRoutePaths.auth.login)]);
  }

  protected readonly AppRoutePaths = AppRoutePaths;
}
