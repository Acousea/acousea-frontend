import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SummaryCardComponent} from "../summary-card/summary-card.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {CardComponent} from "../card/card.component";
import {AlertPopUpService} from "../../../services/pop-ups-services/alert-popup/alert-pop-up.service";

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    SummaryCardComponent,
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

