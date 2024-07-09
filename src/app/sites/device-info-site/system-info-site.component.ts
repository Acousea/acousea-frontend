import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DeviceInfo} from "./device-info-value-objects/device-info-value-objects";
import {IcListenDeviceService} from "../../services/ic-listen-device-service/ic-listen-device.service";
import {BackendResponse} from "../../global-interfaces/global-interfaces";
import {UpdateInfoButtonComponent} from "../../components/update-info-button/update-info-button.component";

@Component({
  selector: 'app-device-info-site',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    UpdateInfoButtonComponent
  ],
  templateUrl: './system-info-site.component.html',
  styleUrl: './system-info-site.component.css'
})
export class SystemInfoSiteComponent implements OnInit{
  deviceInfo: DeviceInfo | undefined;
  errorMessage: string | undefined;

  constructor(protected deviceInfoService: IcListenDeviceService) { }

  ngOnInit(): void {
    this.deviceInfoService.getICListenInfo('192.168.10.150').subscribe((response: BackendResponse<DeviceInfo>) => {
      if (response.success) {
        this.deviceInfo = response.success;
        this.errorMessage = undefined;
      } else if (response.error) {
        this.deviceInfo = undefined;
        this.errorMessage = response.error.error_message;
      }
    });
  }

  protected readonly console = console;
}

