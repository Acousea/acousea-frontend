import {Component} from '@angular/core';
import {ControlSystemConfigComponent} from "./control-system-config/control-system-config.component";
import {PamSystemConfigComponent} from "./pam-system-config/pam-system-config.component";
import {StreamingConfigComponent} from "./streaming-config/streaming-config.component";
import {PamDeviceStatusComponent} from "../../system-info/pam-device-status/pam-device-status.component";
import {NodeDevice} from "../../../global-interfaces/nodes/NodeDevice";
import {SelectedNodeService} from "../../../services/selected-node-service/selected-node.service";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf, UpperCasePipe} from "@angular/common";
import {NodeDevicesService} from "../../../services/node-devices-service/node-devices.service";

@Component({
  selector: 'app-settings-site',
  standalone: true,
  imports: [
    ControlSystemConfigComponent,
    PamDeviceStatusComponent,
    PamSystemConfigComponent,
    StreamingConfigComponent,
    TranslateModule,
    UpperCasePipe,
    NgIf
  ],
  templateUrl: './node-settings.component.html',
  styleUrl: './node-settings.component.css'
})
export class NodeSettingsComponent {

  selectedNode: NodeDevice | undefined;

  constructor(
    protected selectedNodeService: SelectedNodeService,
    protected nodeDevicesService: NodeDevicesService,
  ) {
    selectedNodeService.selectedNode$.subscribe(node => {
      console.warn('New Selected node', node)
      this.selectedNode = node;
    });
  }

  applySettings() {
    if (!this.selectedNode) {
      console.error('No node selected');
      return;
    }
    this.nodeDevicesService.setNodeConfiguration(this.selectedNode);
  }

}
