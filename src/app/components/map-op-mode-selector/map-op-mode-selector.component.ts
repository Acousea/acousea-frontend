import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../app.config";
import {SummaryCardComponent} from "../cards/summary-card/summary-card.component";
import {DeviceCardComponent} from "../cards/device-card/device-card.component";
import {AlertPopUpService} from "../../services/pop-ups-services/alert-popup/alert-pop-up.service";
import {
  DeviceConfigPopUpService
} from "../../services/pop-ups-services/device-config-popup-service/device-config-pop-up.service";



@Component({
  selector: 'app-map-op-mode-selectors',
  standalone: true,
  imports: [
    FormsModule,
    KeyValuePipe,
    NgForOf,
    SummaryCardComponent,
    DeviceCardComponent
  ],
  templateUrl: './map-op-mode-selector.component.html',
  styleUrl: './map-op-mode-selector.component.css'
})
export class MapOpModeSelectorComponent  {

  constructor(private http: HttpClient,
              protected alertPopUpService: AlertPopUpService,
              protected deviceConfigPopUpService: DeviceConfigPopUpService
              ) {}
}
