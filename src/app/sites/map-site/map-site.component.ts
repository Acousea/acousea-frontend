import { Component } from '@angular/core';
import {MapGeoComponent} from "../../components/map-geo/map-geo.component";
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'app-map-site',
  standalone: true,
  imports: [
    MapGeoComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './map-site.component.html',
  styleUrl: './map-site.component.css'
})
export class MapSiteComponent {

}
