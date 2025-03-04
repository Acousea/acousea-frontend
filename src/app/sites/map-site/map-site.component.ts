import {Component} from '@angular/core';
import {MapGeoComponent} from "../../components/map-site/map-geo/map-geo.component";
import {FormsModule} from "@angular/forms";
import {KeyValuePipe} from "@angular/common";

import {DeviceConfigPopupComponent} from "../../components/map-site/device-config-popup/device-config-popup.component";
import {NodeDevice} from '../../global-interfaces/nodes/NodeDevice';
import {NodeDevicesService} from "../../services/node-devices-service/node-devices.service";


@Component({
  selector: 'app-map-site',
  standalone: true,
  imports: [
    MapGeoComponent,
    FormsModule,
    KeyValuePipe,
    DeviceConfigPopupComponent,
  ],
  templateUrl: './map-site.component.html',
  styleUrl: './map-site.component.css'
})
export class MapSiteComponent {

  nodes: NodeDevice[] = [];

  constructor(private communicationSystemService: NodeDevicesService) {
    this.communicationSystemService.getNodes()
      .subscribe({
        next: nodes => {
          this.nodes = nodes;
          console.log('Nodes:', this.nodes);
        },
        error: error => {
          console.error('Error fetching nodes:', error);
        }
      });
  }
}
