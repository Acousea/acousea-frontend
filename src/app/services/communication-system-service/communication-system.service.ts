import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {catchError, Observable, throwError} from "rxjs";
import {BackendError, BackendResponse, CommunicationResultResponse} from "../../global-interfaces/global-interfaces";
import {AlertPopUpService} from "../pop-ups-services/alert-popup/alert-pop-up.service";
import {map} from "rxjs/operators";
import {undoable} from "../pop-ups-services/undo-popup-service/undoable-decorator";
import { environment } from '@/environments/environment';


export interface ReportingPeriods {
  launchingSbdPeriod: number;
  launchingLoraPeriod: number;
  workingSbdPeriod: number;
  workingLoraPeriod: number;
  recoveringSbdPeriod: number;
  recoveringLoraPeriod: number;
}

export interface CommunicationSystemDeviceLocation {
  latitude: number;
  longitude: number;
  device: 'localizer' | 'drifter';
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationSystemService {

  constructor(private httpClient: HttpClient, private alertPopUpService: AlertPopUpService) {
  }

  getLocalizerLocation(): Observable<CommunicationSystemDeviceLocation | null> {
    return this.httpClient.get<BackendResponse<CommunicationSystemDeviceLocation>>(
      `${environment.apiUrl}/${environment.apiVersion}/communication-system/localizer/location`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.success;
          } else {
            this.handleError(response.error);
            return null;
          }
        }),
        catchError(error => {
          this.alertPopUpService.showErrorMessage('An error occurred while fetching the localizer location.');
          return throwError(() => new Error('Failed to fetch localizer location.'));
        })
      );
  }

  getDrifterLocation(): Observable<CommunicationSystemDeviceLocation | null> {
    return this.httpClient.get<BackendResponse<CommunicationSystemDeviceLocation>>(
      `${environment.apiUrl}/${environment.apiVersion}/communication-system/drifter/location`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.success;
          } else {
            this.handleError(response.error);
            return null;
          }
        }),
        catchError(error => {
          this.alertPopUpService.showErrorMessage('An error occurred while fetching the drifter location.');
          return throwError(() => new Error('Failed to fetch drifter location.'));
        })
      );
  }

  private handleError(error: BackendError | undefined) {
    if (error) {
      const errorMessage = error.error_message || 'An unknown error occurred';
      this.alertPopUpService.showErrorMessage(errorMessage);
    }
  }
  setReportingPeriods(periods: ReportingPeriods): void {
    const apiUrl = `${environment.apiUrl}/${environment.apiVersion}/communication-system/drifter/reporting-periods`;
    this.httpClient.post<BackendResponse<CommunicationResultResponse>>(apiUrl, periods).subscribe(
      response => {
        if (response.success) {
          console.log(response.success.message);
        } else {
          this.handleError(response.error);
        }
      },
      error => {
        this.alertPopUpService.showErrorMessage('An error occurred while setting the reporting periods.');
      }
    );
  }


  getReportingPeriods(): Observable<ReportingPeriods> {
    const apiUrl = `${environment.apiUrl}/${environment.apiVersion}/communication-system/drifter/reporting-periods`;
    return this.httpClient.get<BackendResponse<ReportingPeriods>>(apiUrl).pipe(
      map(response => {
        if (response.success) {
          return response.success;
        } else {
          this.handleError(response.error);
          return {
            launchingSbdPeriod: 0,
            launchingLoraPeriod: 0,
            workingSbdPeriod: 0,
            workingLoraPeriod: 0,
            recoveringSbdPeriod: 0,
            recoveringLoraPeriod: 0
          };
        }
      }),
      catchError(error => {
        this.alertPopUpService.showErrorMessage('An error occurred while fetching the reporting periods.');
        return throwError(() => new Error('Failed to fetch reporting periods.'));
      })
    );
  }


  @undoable(2000)
  getUpdatedReportingPeriods(): void {
    const apiUrl = `${environment.apiUrl}/${environment.apiVersion}/communication-system/drifter/reporting-periods/update`;
    this.httpClient.post<BackendResponse<CommunicationResultResponse>>(apiUrl, {}).subscribe(
      response => {
        if (response.success) {
          console.log(response.success.message);
        } else {
          this.handleError(response.error);
        }
      },
      error => {
        this.alertPopUpService.showErrorMessage('An error occurred while setting the reporting periods.');
      }
    );
  }
}
