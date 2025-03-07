import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {PamDeviceStatusComponent} from "@/app/components/node-monitor-panel/pam-device-status/pam-device-status.component";
import {
  CoreTemperatureAndOperationModeComponent
} from "@/app/components/node-monitor-panel/core-temperature-and-operation-mode/core-temperature-and-operation-mode.component";
import {TranslateModule} from "@ngx-translate/core";
import {ICListenHF, pamModuleTypes} from "@/app/global-interfaces/nodes/PamModules";
import {ExtModule} from "@/app/global-interfaces/nodes/ExtModules";
import {SelectedNodeService} from "@/app/services/selected-node-service/selected-node.service";
import {LocationCardComponent} from "@/app/components/node-monitor-panel/location-card/location-card.component";
import {BatteryCardComponent} from "@/app/components/node-monitor-panel/battery-card/battery-card.component";
import {AmbientComponent} from "@/app/components/node-monitor-panel/ambient-card/ambient.component";
import {StorageCardComponent} from "@/app/components/node-monitor-panel/storage-card/storage-card.component";


@Component({
  selector: 'app-node-info',
  standalone: true,
  imports: [
    NgIf,
    StorageCardComponent,
    LocationCardComponent,
    PamDeviceStatusComponent,
    CoreTemperatureAndOperationModeComponent,
    TranslateModule,
    LocationCardComponent,
    BatteryCardComponent,
    AmbientComponent
  ],
  templateUrl: './node-info.component.html',
  styleUrl: './node-info.component.css'
})
export class NodeInfoComponent {
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

