import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    CardComponent
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css'
})
export class SummaryCardComponent {
  @Input() boldText!: string;
  @Input() lightText!: string;
  @Input() icon!: string;
}
