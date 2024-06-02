import {Component} from '@angular/core';

import {SummaryCardComponent} from "../../components/summary-card/summary-card.component";
import {LineChartComponent} from "../../components/charts/line-chart/line-chart.component";

interface ChartInputData {
  dataLabel: string;
  data: { x: number; y: number }[];
}

@Component({
  selector: 'app-summary-site',
  standalone: true,
  imports: [
    SummaryCardComponent,
    LineChartComponent
  ],
  templateUrl: './summary-site.component.html',
  styleUrl: './summary-site.component.css'
})
export class SummarySiteComponent {
  clickData: ChartInputData | undefined = undefined;

  clicks: number[] = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  timestamps: number[] = [
    new Date(2024, 1, 1, 0, 0, 0).getTime(),
    new Date(2024, 1, 1, 1, 0, 0).getTime(),
    new Date(2024, 1, 1, 2, 0, 0).getTime(),
    new Date(2024, 1, 1, 3, 0, 0).getTime(),
    new Date(2024, 1, 1, 4, 0, 0).getTime(),
    new Date(2024, 1, 1, 5, 0, 0).getTime(),
    new Date(2024, 1, 1, 6, 0, 0).getTime(),
    new Date(2024, 1, 1, 7, 0, 0).getTime(),
    new Date(2024, 1, 1, 8, 0, 0).getTime(),
    new Date(2024, 1, 1, 9, 0, 0).getTime(),
  ]


  constructor() {
    this.clickData = {
      dataLabel: 'Clicks',
      data: this.clicks.map((click, index) => {
        return {x: this.timestamps[index], y: click};
      })
    }


  }
}
