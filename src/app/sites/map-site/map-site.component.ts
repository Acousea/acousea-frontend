import {Component} from '@angular/core';
import {MapGeoComponent} from "../../components/map-site/map-geo/map-geo.component";
import {FormsModule} from "@angular/forms";
import {NodeDevice} from '../../global-interfaces/nodes/NodeDevice';
import {NodeContextService} from "@/app/services/node-context/node-context.service";


@Component({
  selector: 'app-map-site',
  standalone: true,
  imports: [
    MapGeoComponent,
    FormsModule,
  ],
  templateUrl: './map-site.component.html',
  styleUrl: './map-site.component.css'
})
export class MapSiteComponent {

  nodes: NodeDevice[] = [];

  constructor(private nodeContext: NodeContextService) {
    this.nodeContext.getAllNodes()
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
