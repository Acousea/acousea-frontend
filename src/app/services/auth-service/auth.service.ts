import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../users/user.interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = {
    id: '',
    username: 'Anonymous',
    password: '',
    personalInfo: {
      firstName: 'Anonymous',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: ''
    },
    profile: {
      profileImageUrl: '',
      preferredLanguage: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    accountStatus: {
      active: false,
      emailVerified: false,
      phoneVerified: false,
      createdAt: '',
      updatedAt: '',
      lastLogin: '',
      loginAttempts: 0,
      passwordChangedAt: ''
    },
    role: 'USER'
  };


  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authenticatedSubject.asObservable();

  login(username: string, password: string): void {
    // Implementa tu lógica de autenticación aquí
    this.authenticatedSubject.next(true); // Cambia esto basado en tu lógica real
  }

  logout(): void {
    this.authenticatedSubject.next(false);
  }

  register(username: string, email: string, password: string) {
    this.authenticatedSubject.next(true);
  }

  isLoggedIn() {
    return true;
  }

  getCurrentUser() {
    return this.user;
  }
}
