import {Component} from '@angular/core';
import {HistogramComponent} from "../../components/histogram/histogram.component";
import {SummaryCardComponent} from "../../components/summary-card/summary-card.component";


@Component({
  selector: 'app-summary-site',
  standalone: true,
  imports: [
    HistogramComponent,
    SummaryCardComponent
  ],
  templateUrl: './summary-site.component.html',
  styleUrl: './summary-site.component.css'
})
export class SummarySiteComponent {
  clickData: { timestamp: Date; clicks: number }[];


  constructor() {
    this.clickData = [
      {timestamp: new Date(2024, 1, 1, 0, 0, 0), clicks: 100},
      {timestamp: new Date(2024, 1, 1, 1, 0, 0), clicks: 200},
      {timestamp: new Date(2024, 1, 1, 2, 0, 0), clicks: 300},
      {timestamp: new Date(2024, 1, 1, 3, 0, 0), clicks: 400},
      {timestamp: new Date(2024, 1, 1, 4, 0, 0), clicks: 500},
      {timestamp: new Date(2024, 1, 1, 5, 0, 0), clicks: 600},
      {timestamp: new Date(2024, 1, 1, 6, 0, 0), clicks: 700},
      {timestamp: new Date(2024, 1, 1, 7, 0, 0), clicks: 800},
      {timestamp: new Date(2024, 1, 1, 8, 0, 0), clicks: 900},
      {timestamp: new Date(2024, 1, 1, 9, 0, 0), clicks: 1000},
    ]
  }
}
