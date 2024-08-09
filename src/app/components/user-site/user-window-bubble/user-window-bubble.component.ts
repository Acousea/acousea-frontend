import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth-service/auth.service";
import {User} from "../../../services/users/user.interfaces";
import {WindowBubbleSubmenuComponent} from "./window-bubble-submenu/window-bubble-submenu.component";
import {BehaviorSubject} from "rxjs";
import {ProfileBubbleComponent} from "./profile-bubble/profile-bubble.component";

@Component({
  selector: 'app-user-window-bubble',
  standalone: true,
  imports: [
    NgIf,
    WindowBubbleSubmenuComponent,
    ProfileBubbleComponent
  ],
  templateUrl: './user-window-bubble.component.html',
  styleUrl: './user-window-bubble.component.css'
})
export class UserWindowBubbleComponent {
  showSubmenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private elementRef: ElementRef) {
  }

  toggleSubmenu() {
    console.log('Submenu toggled');
    this.showSubmenu.next(!this.showSubmenu.value);
  }

  // Listener to detect clicks outside the component
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSubmenu.next(false);
    }
  }


}
