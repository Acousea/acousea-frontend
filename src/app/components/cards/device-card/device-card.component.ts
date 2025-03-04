import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.css'
})
export class DeviceCardComponent {
  @Input() boldText!: string;
  @Input() lightText!: string;
  @Input() icon!: string;
  @Output() openFunction: EventEmitter<void> = new EventEmitter<void>();


}

