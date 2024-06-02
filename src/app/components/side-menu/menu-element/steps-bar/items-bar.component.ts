import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

export interface BarStep {
  text: string;
  link: string;
}

@Component({
  selector: 'app-items-bar',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './items-bar.component.html',
  styleUrl: './items-bar.component.css'
})
export class ItemsBarComponent {
  @Input() items: BarStep[] = [];
}
