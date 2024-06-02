import {Component, Input} from '@angular/core';
import {
  ChartDataset, ChartOptions, ChartType,
  ScaleType,
} from 'chart.js';
import {BaseChartDirective} from "ng2-charts";
import 'chartjs-adapter-date-fns';


@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {
  @Input() inputData: { dataLabel: string, data: {x: number; y: number }[]} | undefined = undefined
  @Input() public scaleType: ScaleType = 'logarithmic';
  @Input() public timeMode = 'day';
  @Input() public lineChartType: ChartType = 'line';
  @Input() public xAxisTitle = 'Time';
  @Input() public yAxisTitle = 'Data';
  public lineChartLegend = true;

  public lineChartData: ChartDataset[] = [
    {
      data: (this.inputData)? this.inputData.data : [
        {x: new Date('2023-01-01').getTime(), y: 10},
        {x: new Date('2023-01-02').getTime(), y: 100},
        {x: new Date('2023-01-03').getTime(), y: 1000},
        {x: new Date('2023-01-04').getTime(), y: 10000},
        {x: new Date('2023-01-05').getTime(), y: 1000},
        {x: new Date('2023-01-06').getTime(), y: 10000},
      ],
      label: (this.inputData)? this.inputData.dataLabel : 'MockData',
      fill: true,
      tension: 0.1,
    }
  ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: this.yAxisTitle,
        },
        type: this.scaleType,
        position: 'right',
        ticks: {
          callback: function (value, index, values) {
            if (value === 10 || value === 100 || value === 1000 || value === 10000 || value === 100000 || value === 1000000) {
              return value.toString();
            }
            return null;
          }
        }
      },
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Date',
        },
        time: {
          unit: 'day',
          displayFormats: {
            day: 'd MMM yyy'
          }
        }
      }
    }
  };

}
