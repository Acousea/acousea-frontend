import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MenuElementComponent, MenuItem} from "./menu-element/menu-element.component";
import {SearchBarComponent} from "../search-bar/search-bar.component";

@Component({
    selector: 'app-side-menu',
    imports: [
        RouterLink,
        MenuElementComponent,
        SearchBarComponent
    ],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  historyMenuItems: MenuItem[] = [
    {link: '/history/iridium-messages', text: 'Iridium Messages', icon: ''},
    {link: '/history/control-system', text: 'Control System', icon: ''},
    {link: '/history/pam-system', text: 'PAM System', icon: ''}
  ];
  configurationMenuItems: MenuItem[] = [
    {link: '/configuration/streaming', text: 'Streaming Settings', icon: ''},
    {link: '/configuration/control-system', text: 'Control System Settings', icon: ''},
    {link: '/configuration/pam-system', text: 'PAM System Settings', icon: ''},

  ];


}
