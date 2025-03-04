import {Component} from '@angular/core';
import {ControlSystemConfigComponent} from "./control-system-config/control-system-config.component";
import {PamSystemConfigComponent} from "./pam-system-config/pam-system-config.component";
import {StreamingConfigComponent} from "./streaming-config/streaming-config.component";
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {SelectedNodeService} from "@/app/services/selected-node-service/selected-node.service";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf, UpperCasePipe} from "@angular/common";
import {NodeDevicesService} from "@/app/services/node-devices-service/node-devices.service";

@Component({
  selector: 'app-settings-site',
  standalone: true,
  imports: [
    ControlSystemConfigComponent,
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
