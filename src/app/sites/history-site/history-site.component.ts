import { Component } from '@angular/core';
import {
  RockBlockMessagesTableComponent
} from "../../components/rock-block-messages-table/rock-block-messages-table.component";
import {
  RockblockMessageDetailsPopupComponent
} from "../../components/pop-ups/rockblock-message-details-popup/rockblock-message-details-popup.component";

@Component({
    selector: 'app-history-site',
    imports: [
        RockBlockMessagesTableComponent,
        RockblockMessageDetailsPopupComponent
    ],
    templateUrl: './history-site.component.html',
    styleUrl: './history-site.component.css'
})
export class HistorySiteComponent {

}
