import {Component} from '@angular/core';
import {ControlSystemConfigComponent} from "@/app/components/node-monitor-panel/control-system-config/control-system-config.component";
import {PamSystemConfigComponent} from "@/app/components/node-monitor-panel/pam-modules/pam-system-config/pam-system-config.component";
import {StreamingConfigComponent} from "@/app/components/node-monitor-panel/pam-modules/streaming-config/streaming-config.component";
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
  templateUrl: './node-settings-section.component.html',
  styleUrl: './node-settings-section.component.css'
})
export class NodeSettingsSectionComponent {

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
