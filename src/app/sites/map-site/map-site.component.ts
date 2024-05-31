import {Component} from '@angular/core';
import {MapGeoComponent} from "../../components/map-geo/map-geo.component";

@Component({
  selector: 'app-map-site',
  standalone: true,
  imports: [
    MapGeoComponent,
  ],
  templateUrl: './map-site.component.html',
  styleUrl: './map-site.component.css'
})
export class MapSiteComponent {

}
