import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [
    CardComponent,
    NgIf
  ],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.css'
})
export class DeviceCardComponent {
  @Input() boldText!: string;
  @Input() lightText!: string;
  @Input() icon!: string;
}

