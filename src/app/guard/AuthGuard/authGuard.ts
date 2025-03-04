import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth-service/auth.service";
import {AppRoutePaths} from "../../app.route.paths";

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    console.log("AuthGuard()::isLoggedIn() -> user is logged in.");
    console.log("Route state: ", state, "Route: ", route)
    // Solo redirige si la ruta actual no es la ruta de resumen
    if (state.url.includes(AppRoutePaths.auth.login) || state.url.includes(AppRoutePaths.auth.register.base)) {
      state.url = AppRoutePaths.summary.base;
      router.navigate([AppRoutePaths.summary]);
    }
    return true;
  } else {
    console.log("AuthGuard()::isLoggedIn() -> user is not logged in.");
    // Solo redirige si la ruta actual no es la ruta de login
    if (!state.url.includes(AppRoutePaths.auth.login) || state.url.includes(AppRoutePaths.auth.register.base)) {
      router.navigate([AppRoutePaths.auth.login]);
    }
    return true;
  }
};


/*
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/not-available']);
          return false;
        }
      })
    );
  }
}
 */
