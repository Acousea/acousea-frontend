import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {User} from "../users/user.interfaces";
import {BackendRoutePaths} from "../../app.route.paths";
import {ApiService} from "../api-service/api.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | undefined = undefined;

  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticatedSubject.asObservable();

  constructor(private apiService: ApiService,
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.setAuthStatus(true);
    }
  }

  login(username: string, password: string) {
    // Implementa tu lógica de autenticación aquí
    const loginUrl = BackendRoutePaths.user.login;

    this.apiService.post<User>(loginUrl, {username, password}).subscribe({
      next: (response) => {
        this.user = response;
        console.log("User logged in: ", this.user);
        this.setAuthStatus(true);
        // Refresh site
        window.location.reload();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  async logout() {

    const result = await firstValueFrom(this.apiService.post<Boolean>(BackendRoutePaths.user.logout, {}));
    console.log("Logout result: ", result);

    if (!result) {
      console.error("Failed to logout");
      return;
    }
    this.setAuthStatus(false);

    // Refresh site
    window.location.reload();
  }

  register(username: string, email: string, password: string) {
    const registerUrl = BackendRoutePaths.user.register;

    this.apiService.post<User>(registerUrl, {
      username,
      email,
      password
    }).subscribe((response:User) => {
      this.user = response;
      console.log("User registered: ", this.user);
      this.authenticatedSubject.next(true); // Cambia esto basado en tu lógica real
      // Refresh site
      window.location.reload();
    });
  }

  isLoggedIn() {
    return this.authenticatedSubject.value;
  }

  getCurrentUser() {
    return this.user;
  }

  private setAuthStatus(authenticated: boolean) {
    if (authenticated) {
      this.authenticatedSubject.next(true);
      localStorage.setItem('user', JSON.stringify(this.user));

    } else {
      this.authenticatedSubject.next(false);
      localStorage.removeItem('user');
    }
  }
}
