import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {StorageStatusComponent} from "../../system-info/storage-status/storage-status.component";
import {BatteryStatusComponent} from "../../system-info/battery-status/battery-status.component";
import {
  TemperatureAndHumidityComponent
} from "../../system-info/temperature-and-humidity/temperature-and-humidity.component";
import {CoordinatesComponent} from "../../system-info/coordinates/coordinates.component";
import {PamDeviceStatusComponent} from "../../system-info/pam-device-status/pam-device-status.component";
import {
  CoreTemperatureAndOperationModeComponent
} from "../../system-info/core-temperature-and-operation-mode/core-temperature-and-operation-mode.component";
import {TranslateModule} from "@ngx-translate/core";
import {ICListenHF, pamModuleTypes} from "@/app/global-interfaces/nodes/PamModules";
import {ExtModule} from "@/app/global-interfaces/nodes/ExtModules";
import {SelectedNodeService} from "@/app/services/selected-node-service/selected-node.service";


@Component({
  selector: 'app-node-info',
  standalone: true,
  imports: [
    NgIf,
    StorageStatusComponent,
    BatteryStatusComponent,
    TemperatureAndHumidityComponent,
    CoordinatesComponent,
    PamDeviceStatusComponent,
    CoreTemperatureAndOperationModeComponent,
    TranslateModule
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

