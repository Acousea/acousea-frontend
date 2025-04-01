import {Component} from '@angular/core';

import {TranslateModule} from "@ngx-translate/core";
import {AppRoutePaths, BackendRoutePaths} from "../../app.route.paths";
import {NodeDevice} from "../../global-interfaces/nodes/NodeDevice";
import {
  DeviceCardsListComponent
} from "../../components/map-site/drifter-localizer-cards-component/device-cards-list.component";
import {TitleCasePipe} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {UpdateInfoButtonComponent} from "../../components/shared/addons/update-info-button/update-info-button.component";
import {NodeConfigurationService} from "@/app/services/node-context/node-configuration-service/node-configuration.service";
import {NodeContextService} from "@/app/services/node-context/node-context.service";

export interface ChartInputData {
  dataLabel: string;
  data: { x: number; y: number }[];
}

@Component({
  selector: 'app-dashboard-site',
  standalone: true,
  imports: [
    TranslateModule,
    DeviceCardsListComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TitleCasePipe,
    UpdateInfoButtonComponent
  ],
  templateUrl: './dashboard-site.component.html',
  styleUrl: './dashboard-site.component.css'
})
export class DashboardSiteComponent {
  nodes: NodeDevice[] = [];
  private _selectedNode: NodeDevice | undefined = undefined;
  get selectedNode(): NodeDevice | undefined {
    return this._selectedNode;
  }

  set selectedNode(value: NodeDevice | undefined) {
    this._selectedNode = value;
    console.warn('selectedNode ha cambiado:', this._selectedNode);
    if (value) {
      this.nodeContext.setSelectedNode(value);
    }
  }

  constructor(
    protected authService: AuthService,
    private nodeDevicesService: NodeConfigurationService,
    private nodeContext: NodeContextService
  ) {
    this.nodeDevicesService.getNodes().subscribe(nodes => {
      if (!nodes) {
        console.error('Error fetching nodes');
        return;
      }
      console.log("SummarySiteComponent() => Nodes fetched: ", nodes);
      this.nodes = nodes;
      this.selectedNode = nodes[0];

    });
  }

  protected readonly BackendRoutePaths = BackendRoutePaths;
  protected readonly AppRoutePaths = AppRoutePaths;
  protected readonly console = console;
}
