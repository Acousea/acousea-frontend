import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {SystemStatusInformation} from "./system-info-value-objects/system-info-value-objects";
import {CommunicationSystemInfoService} from "../../services/ic-listen-device-service/communication-system-info.service";
import {BackendResponse} from "../../global-interfaces/global-interfaces";
import {UpdateInfoButtonComponent} from "../../components/update-info-button/update-info-button.component";
import {StorageStatusComponent} from "../../components/storage-status/storage-status.component";
import {BatteryStatusComponent} from "../../components/battery-status/battery-status.component";
import {
  TemperatureAndHumidityComponent
} from "../../components/temperature-and-humidity/temperature-and-humidity.component";
import {CoordinatesComponent} from "../../components/coordinates/coordinates.component";
import {PamDeviceStatusComponent} from "../../components/pam-device-status/pam-device-status.component";
import {
  CoreTemperatureAndOperationModeComponent
} from "../../components/core-temperature-and-operation-mode/core-temperature-and-operation-mode.component";


@Component({
  selector: 'app-system-info-site',
  standalone: true,
  imports: [
    NgIf,
    UpdateInfoButtonComponent,
    StorageStatusComponent,
    BatteryStatusComponent,
    TemperatureAndHumidityComponent,
    CoordinatesComponent,
    PamDeviceStatusComponent,
    CoreTemperatureAndOperationModeComponent
  ],
  templateUrl: './system-info-site.component.html',
  styleUrl: './system-info-site.component.css'
})
export class SystemInfoSiteComponent implements OnInit{
  systemInfo: SystemStatusInformation | undefined;
  errorMessage: string | undefined;

  constructor(protected deviceInfoService: CommunicationSystemInfoService) { }

  ngOnInit(): void {
    this.deviceInfoService.getSystemStatusInfo().subscribe((response: BackendResponse<SystemStatusInformation>) => {
      if (response.success) {
        this.systemInfo = response.success;
        this.errorMessage = undefined;
      } else if (response.error) {
        this.systemInfo = undefined;
        this.errorMessage = response.error.error_message;
      }
    });
  }

  protected readonly console = console;
}

