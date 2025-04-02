import {Component} from '@angular/core';

import {TranslateModule} from "@ngx-translate/core";
import {AppRoutePaths, BackendRoutePaths} from "../../app.route.paths";
import {NodeDevice} from "../../global-interfaces/nodes/NodeDevice";
import {TitleCasePipe} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {
  UpdateInfoButtonComponent
} from "../../components/shared/addons/update-info-button/update-info-button.component";
import {NodeContextService} from "@/app/services/node-context/node-context.service";
import {
  DeviceCardsListComponent
} from "@/app/components/map-site/drifter-localizer-cards-component/device-cards-list.component";

export interface ChartInputData {
  dataLabel: string;
  data: { x: number; y: number }[];
}

@Component({
  selector: 'app-dashboard-site',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TitleCasePipe,
    UpdateInfoButtonComponent,
    DeviceCardsListComponent
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
  }

  constructor(
    protected authService: AuthService,
    private nodeContext: NodeContextService
  ) {
    this.nodeContext.nodes$.subscribe(nodes => {
      this.nodes = nodes;
    })
    this.nodeContext.selectedNode$.subscribe(selectedNode => {
      console.warn("DashboardSiteComponent::selectedNodeChange: ", selectedNode);
      this.selectedNode = selectedNode;
    })
  }

  protected readonly BackendRoutePaths = BackendRoutePaths;
  protected readonly AppRoutePaths = AppRoutePaths;
  protected readonly console = console;
}
