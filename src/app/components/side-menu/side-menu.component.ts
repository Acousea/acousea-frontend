import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass, NgStyle} from "@angular/common";
import {MenuElementComponent, MenuItem} from "./menu-element/menu-element.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {LanguageSelectorComponent} from "./language-selector/language-selector.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgClass,
    MenuElementComponent,
    NgStyle,
    SearchBarComponent,
    LanguageSelectorComponent,
    TranslateModule
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  configurationMenuItems: MenuItem[] = [
    {link: '/configuration/streaming', text: 'PAM_DEVICE.SETTINGS.STREAMING_SETTINGS.TITLE', icon: ''},
    {link: '/configuration/control-system', text: 'COMMUNICATION_SYSTEM.SETTINGS.TITLE', icon: ''},
    {link: '/configuration/pam-system', text: 'PAM_DEVICE.SETTINGS.TITLE', icon: ''},
  ];
}
