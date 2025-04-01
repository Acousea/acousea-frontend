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
import {
  UpdateInfoButtonComponent
} from "../../components/shared/addons/update-info-button/update-info-button.component";
import {NodeContextService} from "@/app/services/node-context/node-context.service";

@Component({
  selector: 'app-settings-site',
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
  templateUrl: './settings-site.component.html',
  styleUrl: './settings-site.component.css'
})
export class SettingsSiteComponent {
  nodes: NodeDevice[] = [];

  constructor(
    protected authService: AuthService,
    private nodeContext: NodeContextService
  ) {
  }

  get selectedNode(): NodeDevice | undefined {
    let selectedNode: NodeDevice | undefined;
    this.nodeContext.selectedNode$.subscribe(node => selectedNode = node);
    return selectedNode;
  }

  protected readonly BackendRoutePaths = BackendRoutePaths;
  protected readonly AppRoutePaths = AppRoutePaths;
  protected readonly console = console;
}
