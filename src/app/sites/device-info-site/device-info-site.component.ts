import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {DeviceInfo} from "./device-info-value-objects/device-info-value-objects";
import {DeviceInfoServiceService} from "./device-info-service/device-info-service.service";

@Component({
  selector: 'app-device-info-site',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './device-info-site.component.html',
  styleUrl: './device-info-site.component.css'
})
export class DeviceInfoSiteComponent {
  deviceInfo: DeviceInfo | undefined;

  constructor(private deviceInfoService: DeviceInfoServiceService) { }

  ngOnInit(): void {
    this.deviceInfoService.getDeviceInfo().subscribe(data => {
      this.deviceInfo = data;
    });
  }
}

