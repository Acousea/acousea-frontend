import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
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
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './items-bar.component.html',
  styleUrl: './items-bar.component.css'
})
export class ItemsBarComponent {
  @Input() items: BarStep[] = [];
}
