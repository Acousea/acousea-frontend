import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {WindowBubbleSubmenuComponent} from "../window-bubble-submenu/window-bubble-submenu.component";
import {User} from "../../../../services/users/user.interfaces";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../../../services/auth-service/auth.service";

@Component({
  selector: 'app-profile-bubble',
  standalone: true,
  imports: [
    NgIf,
    WindowBubbleSubmenuComponent
  ],
  templateUrl: './profile-bubble.component.html',
  styleUrl: './profile-bubble.component.css'
})
export class ProfileBubbleComponent implements OnInit {


  user: User | undefined = undefined;
  imageError: boolean = false; // Nueva variable para controlar errores de imagen

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  getInitial(): string {
    return this.user?.personalInfo.firstName.charAt(0).toUpperCase() || '';
  }

  onImageError(): void {
    this.imageError = true; // Cambia el estado si ocurre un error en la carga de la imagen
  }


}
