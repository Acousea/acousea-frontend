import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css'
})
export class SummaryCardComponent {
  @Input() boldText!: string;
  @Input() lightText!: string;
  @Input() icon!: string;
}
