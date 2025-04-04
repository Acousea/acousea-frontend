import {Component} from '@angular/core';

import {TranslateModule} from "@ngx-translate/core";
import {AppRoutePaths} from "../../routes/app.route.paths";
import {NodeDevice} from "../../global-interfaces/nodes/NodeDevice";
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {
  UpdateInfoButtonComponent
} from "../../components/shared/addons/update-info-button/update-info-button.component";
import {NodeContextService} from "@/app/services/node-context/node-context.service";
import {
  DeviceCardsListComponent
} from "@/app/components/map-site/drifter-localizer-cards-component/device-cards-list.component";
import {BackendRoutePaths} from "@/app/routes/backend.route.paths";

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
    DeviceCardsListComponent,
    AsyncPipe
  ],
  templateUrl: './dashboard-site.component.html',
  styleUrl: './dashboard-site.component.css'
})
export class DashboardSiteComponent {
  nodes: NodeDevice[] = [];

  selectedNode$ = this.nodeContext.selectedNode$;
  onNodeSelected(node: NodeDevice) {
    this.nodeContext.setSelectedNode(node);
  }

  constructor(
    protected authService: AuthService,
    private nodeContext: NodeContextService
  ) {
    this.nodeContext.nodes$.subscribe(nodes => {
      this.nodes = nodes;
    })
  }

  protected readonly BackendRoutePaths = BackendRoutePaths;
  protected readonly AppRoutePaths = AppRoutePaths;
  protected readonly console = console;
}
