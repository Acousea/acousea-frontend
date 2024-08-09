import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BackendResponse, CommunicationResultResponse} from "../../global-interfaces/global-interfaces";
import {undoable} from "../pop-ups-services/undo-popup-service/undoable-decorator";
import {BackendRoutePaths} from "../../app.route.paths";

export interface PAMDeviceFFTLoggingConfig {
  sample_rate: number;
  fft_processing_type: number;
  ffts_accumulated: number;
  logging_mode: boolean;
  log_length: number;
}

export interface PAMDeviceWaveformLoggingConfig {
  gain: number;
  sample_rate: number;
  bit_depth: number;
  logging_mode: boolean;
  log_length: number;
}

export interface PAMDeviceLoggingConfigReadModel {
  timestamp: string;
  waveform_config: PAMDeviceWaveformLoggingConfig;
  fft_config: PAMDeviceFFTLoggingConfig;
}

@Injectable({
  providedIn: 'root'
})
export class LoggingConfigService {
  constructor(private httpClient: HttpClient) {
  }

  getLoggingConfig(): Observable<PAMDeviceLoggingConfigReadModel> {
    const apiUrl = BackendRoutePaths.pamSystem.loggingConfiguration
    return this.httpClient.get<BackendResponse<PAMDeviceLoggingConfigReadModel>>(apiUrl).pipe(
      map((response: BackendResponse<PAMDeviceLoggingConfigReadModel>) => {
        if (response.error) {
          throw new Error(response.error.error_message);
        }
        if (response.success) {
          console.log("GET LOGGING CONFIG: ", response.success)
          return response.success;
        }
        throw new Error('Unexpected response format');
      })
    );
  }

  @undoable(2000)
  getUpdatedLoggingConfig() {
    console.log('Requesting updated logging config');
    const apiUrl = BackendRoutePaths.update(BackendRoutePaths.pamSystem.loggingConfiguration)
    this.httpClient.post<BackendResponse<CommunicationResultResponse>>(apiUrl, {}).subscribe({
      next: (response: BackendResponse<CommunicationResultResponse>) => {
        if (response.error) {
          throw new Error(response.error.error_message);
        }
        if (response.success) {
          console.log('Updated logging config:', response.success);
        }
      },
      error: (error) => {
        console.error('Error updating logging config:', error.message);
      }
    });
  }

  setLoggingConfig(params: PAMDeviceLoggingConfigReadModel): Observable<BackendResponse<CommunicationResultResponse>> {
    console.log("PARAMS LOGGING CONFIG: ", params)
    const apiUrl = BackendRoutePaths.set(BackendRoutePaths.pamSystem.loggingConfiguration)
    return this.httpClient.post<BackendResponse<CommunicationResultResponse>>(apiUrl, params).pipe(
      map((response: BackendResponse<CommunicationResultResponse>) => {
        if (response.error) {
          throw new Error(response.error.error_message);
        }
        return response;
      })
    );
  }
}
