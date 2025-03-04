import {Component} from '@angular/core';
import {MapGeoComponent} from "../../components/map-geo/map-geo.component";
import {FormsModule} from "@angular/forms";

import {DeviceConfigPopupComponent} from "../../components/pop-ups/device-config-popup/device-config-popup.component";
import {
  DrifterLocalizerCardsComponent
} from "../../components/drifter-localizer-cards-component/drifter-localizer-cards.component";


@Component({
    selector: 'app-map-site',
    imports: [
        MapGeoComponent,
        FormsModule,
        DrifterLocalizerCardsComponent,
        DeviceConfigPopupComponent,
    ],
    templateUrl: './map-site.component.html',
    styleUrl: './map-site.component.css'
})
export class MapSiteComponent {


}
