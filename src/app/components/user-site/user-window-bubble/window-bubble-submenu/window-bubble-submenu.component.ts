import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {AppRoutePaths} from "@/app/routes/app.route.paths";
import {Router} from "@angular/router";
import {AuthService} from "@/app/services/auth/auth.service";

export interface SubmenuItem{
  title: string;
  icon: string;
  action: () => void;
}

@Component({
  selector: 'app-window-bubble-submenu',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './window-bubble-submenu.component.html',
  styleUrl: './window-bubble-submenu.component.css'
})
export class WindowBubbleSubmenuComponent {
  @Input() menuItems: SubmenuItem[] = [];

  constructor() {}


}
