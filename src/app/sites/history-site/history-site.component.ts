import { Component } from '@angular/core';
import {
  RockBlockMessagesTableComponent
} from "../../components/history-site/rock-block-messages-table/rock-block-messages-table.component";
import {
  RockblockMessageDetailsPopupComponent
} from "../../components/history-site/pop-ups/rockblock-message-details-popup/rockblock-message-details-popup.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-history-site',
  standalone: true,
  imports: [
    RockBlockMessagesTableComponent,
    RockblockMessageDetailsPopupComponent,
    TranslateModule
  ],
  templateUrl: './history-site.component.html',
  styleUrl: './history-site.component.css'
})
export class HistorySiteComponent {

}
