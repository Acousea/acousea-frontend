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
    {link: '/recording', text: 'Stream Recording', icon: 'recordings'},
    {link: '/recording/setup-recording', text: 'Setup Recording', icon: 'record'},
    {link: '/recording/export', text: 'Export Recordings', icon: 'record'}
  ];
  configurationMenuItems: MenuItem[] = [
    {link: '/configuration', text: 'Configuration', icon: 'configuration'},
    {link: '/configuration/fft', text: 'FFT', icon: 'fft'},
    {link: '/configuration/wav', text: 'WAV', icon: 'wav'}

  ];

}
