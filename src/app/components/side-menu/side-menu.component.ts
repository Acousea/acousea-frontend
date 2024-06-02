import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import {MenuElementComponent, MenuItem} from "./menu-element/menu-element.component";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgClass,
    MenuElementComponent
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  recordingMenuItems: MenuItem[] = [
    {link: '/recording/stream', text: 'Stream Recording', icon: ''},
    {link: '/recording/setup', text: 'Setup Recording', icon: ''},
    {link: '/recording/export', text: 'Export Recordings', icon: ''}
  ];
  configurationMenuItems: MenuItem[] = [
    {link: '/configuration/data-collection', text: 'Data Collection', icon: ''},
    {link: '/configuration/epoch', text: 'Epoch', icon: ''},
    {link: '/configuration/network', text: 'Network', icon: ''}
  ];

}
