import {Component} from '@angular/core';
import {MapGeoComponent} from "../../components/map-geo/map-geo.component";
import {FormsModule} from "@angular/forms";
import {KeyValuePipe} from "@angular/common";
import {MapOpModeSelectorComponent} from "../../components/map-op-mode-selector/map-op-mode-selector.component";
import {DeviceConfigPopupComponent} from "../../components/pop-ups/device-config-popup/device-config-popup.component";


@Component({
  selector: 'app-map-site',
  standalone: true,
  imports: [
    MapGeoComponent,
    FormsModule,
    KeyValuePipe,
    MapOpModeSelectorComponent,
    DeviceConfigPopupComponent,
  ],
  templateUrl: './map-site.component.html',
  styleUrl: './map-site.component.css'
})
export class MapSiteComponent {


}
