import {Component} from '@angular/core';
import {MapGeoComponent} from "../../components/map-site/map-geo/map-geo.component";
import {FormsModule} from "@angular/forms";
import {KeyValuePipe} from "@angular/common";

import {DeviceConfigPopupComponent} from "../../components/map-site/device-config-popup/device-config-popup.component";
import {
  DrifterLocalizerCardsComponent
} from "../../components/map-site/drifter-localizer-cards-component/drifter-localizer-cards.component";


@Component({
  selector: 'app-map-site',
  standalone: true,
  imports: [
    MapGeoComponent,
    FormsModule,
    KeyValuePipe,
    DrifterLocalizerCardsComponent,
    DeviceConfigPopupComponent,
  ],
  templateUrl: './map-site.component.html',
  styleUrl: './map-site.component.css'
})
export class MapSiteComponent {


}
