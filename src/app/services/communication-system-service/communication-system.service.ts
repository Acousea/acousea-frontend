import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../app.config";
import {catchError, Observable, throwError} from "rxjs";
import {BackendError, BackendResponse} from "../../global-interfaces/global-interfaces";
import {AlertPopUpService} from "../pop-ups-services/alert-popup/alert-pop-up.service";
import {map} from "rxjs/operators";

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
}
