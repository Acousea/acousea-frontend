import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import {BehaviorSubject} from "rxjs";
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
    {link: '/recordings', text: 'Recordings', icon: 'recordings'},
    {link: '/recordings/record', text: 'Record WAV', icon: 'record'},
    {link: '/recordings/record', text: 'Record FFT', icon: 'record'}
  ];
  configurationMenuItems: MenuItem[] = [
    {link: '/configuration', text: 'Configuration', icon: 'configuration'},
    {link: '/configuration/fft', text: 'FFT', icon: 'fft'},
    {link: '/configuration/wav', text: 'WAV', icon: 'wav'}
  ];

}
