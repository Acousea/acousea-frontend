import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../app.config";
import {SystemStatusInformation} from "../../sites/system-info-site/system-info-value-objects/system-info-value-objects";
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

  getICListenInfo(): Observable<BackendResponse<SystemStatusInformation>> {
    return this.httpClient.get<BackendResponse<SystemStatusInformation>>(`${environment.apiUrl}/${environment.apiVersion}/iclisten/info`)
      .pipe(
        map((response: BackendResponse<SystemStatusInformation>) => {
          if (response.success) {
            return response;
          } else {
            throw new Error(response.error?.error_message);
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
}

