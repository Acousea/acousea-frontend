import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../app.config";
import {DeviceInfo} from "../device-info-value-objects/device-info-value-objects";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoServiceService {

  constructor(private httpClient: HttpClient) {}

  getDeviceInfo(): Observable<DeviceInfo> {
    return this.httpClient.get<DeviceInfo>(`${environment.apiUrl}/api/device-info`);
  }
}
