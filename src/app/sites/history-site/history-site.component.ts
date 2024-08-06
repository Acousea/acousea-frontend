import { Component } from '@angular/core';
import {LineChartComponent} from "../../components/charts/line-chart/line-chart.component";
import {
  RockBlockMessagesTableComponent
} from "../../components/rock-block-messages-table/rock-block-messages-table.component";
import {
  RockblockMessageDetailsPopupComponent
} from "../../components/pop-ups/rockblock-message-details-popup/rockblock-message-details-popup.component";
import {SummaryCardComponent} from "../../components/cards/summary-card/summary-card.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-history-site',
  standalone: true,
  imports: [
    LineChartComponent,
    RockBlockMessagesTableComponent,
    RockblockMessageDetailsPopupComponent,
    SummaryCardComponent,
    TranslateModule
  ],
  templateUrl: './history-site.component.html',
  styleUrl: './history-site.component.css'
})
export class HistorySiteComponent {

}
