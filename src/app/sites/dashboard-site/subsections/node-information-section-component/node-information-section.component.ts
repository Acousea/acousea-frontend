import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {
  ICListenDeviceStatusMonitorPanelComponent
} from "@/app/components/node-monitor-panel/pam-modules/iclisten/iclisten-device-status-monitor-panel/iclisten-device-status-monitor-panel.component";
import {
  CoreTemperatureAndOperationModeComponent
} from "@/app/components/node-monitor-panel/pam-modules/core-temperature-and-operation-mode/core-temperature-and-operation-mode.component";
import {TranslateModule} from "@ngx-translate/core";
import {PamModule} from "@/app/global-interfaces/nodes/PamModules";
import {ExtModule} from "@/app/global-interfaces/nodes/ExtModules";


import {
  BatteryMonitorPanelComponent
} from "@/app/components/node-monitor-panel/battery-monitor-panel/battery-monitor-panel.component";
import {
  LocationMonitorPanelComponent
} from "@/app/components/node-monitor-panel/location-monitor-panel/location-monitor-panel.component";
import {
  AmbientMonitorPanelComponent
} from "@/app/components/node-monitor-panel/ambient-monitor-panel/ambient-monitor-panel.component";
import {
  StorageMonitorPanelComponent
} from "@/app/components/node-monitor-panel/storage-monitor-panel/storage-monitor-panel.component";
import {
  RTCMonitorPanelComponent
} from "@/app/components/node-monitor-panel/rtc-monitor-panel/rtc-monitor-panel.component";
import {NodeContextService} from "@/app/services/node-context/node-context.service";
import {WarningComponent} from "@/app/components/shared/warning-component/warning.component";

type InfoViewMode = 'system' | 'iclistenhf' | 'all';

@Component({
  selector: 'app-node-information-section',
  standalone: true,
  imports: [
    NgIf,
    StorageMonitorPanelComponent,
    LocationMonitorPanelComponent,
    ICListenDeviceStatusMonitorPanelComponent,
    CoreTemperatureAndOperationModeComponent,
    TranslateModule,
    BatteryMonitorPanelComponent,
    AmbientMonitorPanelComponent,
    RTCMonitorPanelComponent,
    WarningComponent
  ],
  templateUrl: './node-information-section.component.html',
  styleUrls: ['./node-information-section.component.css', '../inner-tabs-style.css'],
})
export class NodeInformationSectionComponent {
  pamModules: PamModule | undefined;
  extModules: ExtModule | undefined;

  currentView: InfoViewMode = 'system';

  changeView(view: InfoViewMode) {
    this.currentView = view;
  }

  errorMessage: string | undefined;


  constructor(
    nodeContext: NodeContextService
  ) {
    nodeContext.selectedNode$.subscribe((node) => {
      if (!node) {
        console.error("NodeInfoComponent.constructor() -> No node selected");
        this.errorMessage = 'No node selected';
        return;
      }
      this.pamModules = node.pamModules;
      this.extModules = node.extModules
    });
  }

  protected readonly console = console;
}

