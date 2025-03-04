import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {
  ChartDataset, ChartOptions, ChartType,
  ScaleType,
} from 'chart.js';
import {BaseChartDirective} from "ng2-charts";
import 'chartjs-adapter-date-fns';
import {ChartInputData} from "@/app/sites/summary-site/summary-site.component";


@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnChanges {
  @Input() inputData: ChartInputData | undefined = undefined
  @Input() public scaleType: ScaleType = 'linear';
  @Input() public timeMode = 'hour';
  @Input() public lineChartType: ChartType = 'line';
  @Input() public xAxisTitle = 'Time';
  @Input() public yAxisTitle = 'Data';
  public lineChartLegend = true;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public lineChartData: ChartDataset[] = [
    {
      data: (this.inputData) ? this.inputData.data : [],
      label: (this.inputData) ? this.inputData.dataLabel : 'No Data',
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
          unit: 'hour',
          displayFormats: {
            second: 'd MMM yyyy HH:mm:ss' // Mostramos día, mes, año, horas, minutos y segundos
          }
        }
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.lineChartData = [
      {
        data: (this.inputData) ? this.inputData.data: [],
        label: (this.inputData) ? this.inputData.dataLabel : 'No Data',
        fill: true,
        tension: 0.1,
      }
    ];

    if (this.chart) {
      this.chart.update();
    }
    console.log("Line Chart Data: ", this.lineChartData)
  }
}
