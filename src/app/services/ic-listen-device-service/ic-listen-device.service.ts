import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../app.config";
import {DeviceInfo} from "../../sites/device-info-site/device-info-value-objects/device-info-value-objects";
import {catchError, Observable, of} from "rxjs";
import { map } from 'rxjs/operators';
import {BackendResponse} from "../../global-interfaces/global-interfaces";

@Injectable({
  providedIn: 'root'
})
export class IcListenDeviceService {

  constructor(private httpClient: HttpClient) {}

  test(){
    console.log("Test");
  }

  getICListenInfo(ip: string): Observable<BackendResponse<DeviceInfo>> {
    return this.httpClient.get<BackendResponse<DeviceInfo>>(`${environment.apiUrl}/${environment.apiVersion}/iclisten/info/${ip}`)
      .pipe(
        map((response: BackendResponse<DeviceInfo>) => {
          if (response.success) {
            return response;
          } else {
            throw new Error(response.error?.error_message);
          }
        }),
        catchError(error => {
          const errorBackendResponse: BackendResponse<DeviceInfo> = {
            error: {
              error_code: 1,
              error_message: error.message,
            },
          };
          return of(errorBackendResponse);
        })
      );
  }
}

