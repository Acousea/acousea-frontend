import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../app.config";
import {
  CommunicationSystemStatus,
  PAMDeviceStatus,
  SystemStatusInformation
} from "../../sites/system-info-site/system-info-value-objects/system-info-value-objects";
import {catchError, forkJoin, Observable, of} from "rxjs";
import {map} from 'rxjs/operators';
import {BackendResponse} from "../../global-interfaces/global-interfaces";

@Injectable({
  providedIn: 'root'
})
export class CommunicationSystemInfoService {

  constructor(private httpClient: HttpClient) {
  }

  test() {
    console.log("Test");
  }

  getSystemStatusInfo(): Observable<BackendResponse<SystemStatusInformation>> {
    return forkJoin({
      pamDeviceStatus: this.getPamSystemStatusInfo(),
      communicationSystemStatus: this.getCommunicationSystemStatusInfo()
    }).pipe(
      map(({pamDeviceStatus, communicationSystemStatus}) => {
        if (pamDeviceStatus.success && communicationSystemStatus.success) {
          const systemStatus: SystemStatusInformation = {
            last_updated_date: communicationSystemStatus.success.timestamp,
            pam_device_status: pamDeviceStatus.success,
            communication_system_status: communicationSystemStatus.success
          };
          return {success: systemStatus} as BackendResponse<SystemStatusInformation>;
        } else {
          throw new Error('Error combining system status information');
        }
      }),
      catchError(error => {
        const errorBackendResponse: BackendResponse<SystemStatusInformation> = {
          error: {
            error_code: 1,
            error_message: error.message,
          },
        };
        return of(errorBackendResponse);
      })
    );
  }

  getPamSystemStatusInfo(): Observable<BackendResponse<PAMDeviceStatus>> {
    return this.httpClient.get<BackendResponse<PAMDeviceStatus>>(`${environment.apiUrl}/${environment.apiVersion}/pam-system/info`)
      .pipe(
        map((response: BackendResponse<PAMDeviceStatus>) => {
          if (response.success) {
            return response;
          } else {
            throw new Error(response.error?.error_message);
          }
        }),
        catchError(error => {
          const errorBackendResponse: BackendResponse<PAMDeviceStatus> = {
            error: {
              error_code: 1,
              error_message: error.message,
            },
          };
          return of(errorBackendResponse);
        })
      );
  }

  getCommunicationSystemStatusInfo(): Observable<BackendResponse<CommunicationSystemStatus>> {
    return this.httpClient.get<BackendResponse<CommunicationSystemStatus>>(`${environment.apiUrl}/${environment.apiVersion}/communication-system/all-status-information`)
      .pipe(
        map((response: BackendResponse<CommunicationSystemStatus>) => {
          if (response.success) {
            return response;
          } else {
            throw new Error(response.error?.error_message);
          }
        }),
        catchError(error => {
          const errorBackendResponse: BackendResponse<CommunicationSystemStatus> = {
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

