import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AppRoutePaths} from "../../../../app.route.paths";
import {Router} from "@angular/router";

interface SubmenuItem{
  title: string;
  icon: string;
  action: () => void;
}

@Component({
  selector: 'app-window-bubble-submenu',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './window-bubble-submenu.component.html',
  styleUrl: './window-bubble-submenu.component.css'
})
export class WindowBubbleSubmenuComponent {

  constructor(
    private router: Router
  ) {}

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
      title: 'Settings',
      icon: 'settings',
      action: () => {
        console.log('Settings clicked');

      }

    },
    {
      title: 'Logout',
      icon: 'logout',
      action: () => {
        console.log('Logout clicked');
      }
    }
  ];

}
