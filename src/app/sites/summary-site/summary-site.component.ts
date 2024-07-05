import {Component, OnInit} from '@angular/core';

import {SummaryCardComponent} from "../../components/cards/summary-card/summary-card.component";
import {LineChartComponent} from "../../components/charts/line-chart/line-chart.component";
import {StatsService} from "../../services/stats-service/stats.service";
import {
  RockBlockMessagesTableComponent
} from "../../components/rock-block-messages-table/rock-block-messages-table.component";
import {NotificationListComponent} from "../../components/notifications/notification-list/notification-list.component";
import {
  RockblockMessageDetailsPopupComponent
} from "../../components/pop-ups/rockblock-message-details-popup/rockblock-message-details-popup.component";

export interface ChartInputData {
  dataLabel: string;
  data: { x: number; y: number }[];
}

@Component({
  selector: 'app-summary-site',
  standalone: true,
  imports: [
    SummaryCardComponent,
    LineChartComponent,
    RockBlockMessagesTableComponent,
    NotificationListComponent,
    RockblockMessageDetailsPopupComponent
  ],
  templateUrl: './summary-site.component.html',
  styleUrl: './summary-site.component.css'
})
export class SummarySiteComponent implements OnInit {
  clickData: ChartInputData | undefined = undefined;

  clicks: number[] = [];
  timestamps: number[] = []
  numClicks: number = 0;
  numFiles: number = 0;
  numMinutes: number = 0;
  numReports: number = 0;

  constructor(private statsService: StatsService) {
    this.clickData = {
      dataLabel: 'Clicks',
      data: this.clicks.map((click, index) => {
        return {x: this.timestamps[index], y: click};
      })
    }
  }

  ngOnInit(): void {
    this.statsService.getStats().then(stats => {
      if (!stats) {
        this.clickData = undefined;
        return;
      }
      this.clicks = stats.datetime_clicks.map(click => click.num_clicks);
      this.timestamps = stats.datetime_clicks.map(click =>
        new Date(click.datetime).getTime() * 1000); // Can just multiply by 1000 to convert to milliseconds
      this.clickData = {
        dataLabel: 'Clicks',
        data: this.clicks.map((click, index) => {
          return {x: this.timestamps[index], y: click};
        })
      }

      this.numClicks = stats.total_num_clicks;
      this.numFiles = stats.total_number_of_files;
      this.numMinutes = stats.total_recorded_minutes;
    });
  }


  protected readonly String = String;
}
