import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DeviceInfo} from "./device-info-value-objects/device-info-value-objects";
import {DeviceInfoServiceService} from "./device-info-service/device-info-service.service";
import {BackendResponse} from "../../global-interfaces/global-interfaces";

@Component({
  selector: 'app-device-info-site',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './device-info-site.component.html',
  styleUrl: './device-info-site.component.css'
})
export class DeviceInfoSiteComponent implements OnInit{
  deviceInfo: DeviceInfo | undefined;
  errorMessage: string | undefined;

  constructor(private deviceInfoService: DeviceInfoServiceService) { }

  ngOnInit(): void {
    this.deviceInfoService.getDeviceInfo('192.168.10.150').subscribe((response: BackendResponse<DeviceInfo>) => {
      if (response.success) {
        this.deviceInfo = response.success;
        this.errorMessage = undefined;
      } else if (response.error) {
        this.deviceInfo = undefined;
        this.errorMessage = response.error.error_message;
      }
    });
  }
}

