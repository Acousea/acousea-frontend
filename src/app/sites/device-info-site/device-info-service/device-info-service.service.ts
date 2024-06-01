import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../app.config";

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoServiceService {

  constructor(private httpClient: HttpClient) {}

  getDeviceInfo(){
    return this.httpClient.get(`${environment.apiUrl}/api/device-info`);
  }
}
