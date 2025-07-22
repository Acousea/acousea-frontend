import {Component, ElementRef, HostListener} from '@angular/core';
import {NgIf} from "@angular/common";
import {SubmenuItem, WindowBubbleSubmenuComponent} from "./window-bubble-submenu/window-bubble-submenu.component";
import {BehaviorSubject} from "rxjs";
import {ProfileBubbleComponent} from "./profile-bubble/profile-bubble.component";
import {AppRoutePaths} from "@/app/routes/app.route.paths";
import {AuthService} from "@/app/services/auth/auth.service";
import {Router} from "@angular/router";

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
  menuItems: SubmenuItem[] = [
    {
      title: 'Profile',
      icon: 'account_circle',
      action: () => {
        console.log('Profile clicked');
        this.router.navigate([AppRoutePaths.fullPath(AppRoutePaths.user.profile)]);
      }
    },
    {
      title: 'Logout',
      icon: 'logout',
      action: () => {
        console.log('Logout clicked');
        this.authService.logout();
      }
    }
  ];

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private authService: AuthService
  ) {
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
