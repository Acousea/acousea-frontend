import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {
  PamDeviceStatusComponent
} from "@/app/components/node-monitor-panel/pam-modules/pam-device-status/pam-device-status.component";
import {
  CoreTemperatureAndOperationModeComponent
} from "@/app/components/node-monitor-panel/pam-modules/core-temperature-and-operation-mode/core-temperature-and-operation-mode.component";
import {TranslateModule} from "@ngx-translate/core";
import {ICListenHF, pamModuleTypes} from "@/app/global-interfaces/nodes/PamModules";
import {ExtModule} from "@/app/global-interfaces/nodes/ExtModules";
import {SelectedNodeService} from "@/app/services/selected-node-service/selected-node.service";


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


@Component({
  selector: 'app-node-information-section',
  standalone: true,
  imports: [
    NgIf,
    StorageMonitorPanelComponent,
    LocationMonitorPanelComponent,
    PamDeviceStatusComponent,
    CoreTemperatureAndOperationModeComponent,
    TranslateModule,
    BatteryMonitorPanelComponent,
    AmbientMonitorPanelComponent,
    RTCMonitorPanelComponent
  ],
  templateUrl: './node-information-section.component.html',
  styleUrl: './node-information-section.component.css'
})
export class NodeInformationSectionComponent {
  pamModule: ICListenHF | undefined;
  extModules: ExtModule | undefined;

  errorMessage: string | undefined;


  constructor(
    selectedNodeService: SelectedNodeService
  ) {
    selectedNodeService.selectedNode$.subscribe((node) => {
      if (!node) {
        console.error("NodeInfoComponent.constructor() -> No node selected");
        this.errorMessage = 'No node selected';
        return;
      }
      this.pamModule = node.pamModules.find((module) => module.name === pamModuleTypes.ICListenHF) as ICListenHF;
      this.extModules = node.extModules

    });
  }

  protected readonly console = console;
}

