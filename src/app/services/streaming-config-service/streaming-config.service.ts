import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '@/environments/environment';
import {BackendResponse, CommunicationResultResponse} from "../../global-interfaces/global-interfaces";
import {map} from "rxjs/operators";
import {undoable} from "../pop-ups-services/undo-popup-service/undoable-decorator";

export interface StreamingWaveformConfig {
  record_waveform: boolean;
  process_waveform: boolean;
  waveform_processing_type: number;
  waveform_interval: number;
  waveform_duration: number;
}

export interface StreamingSpectrumConfig {
  record_fft: boolean;
  process_fft: boolean;
  fft_processing_type: number;
  fft_interval: number;
  fft_duration: number;
}

export interface StreamingConfigResponse {
  waveform_config: StreamingWaveformConfig;
  fft_config: StreamingSpectrumConfig;
  timestamp: string;
}



@Injectable({
  providedIn: 'root'
})
export class StreamingConfigService {

  constructor(private http: HttpClient) {
  }

  getConfig(): Observable<StreamingConfigResponse> {
    const apiUrl = `${environment.apiUrl}/${environment.apiVersion}/pam-system/streaming-configuration`;
    return this.http.get<BackendResponse<StreamingConfigResponse>>(apiUrl).pipe(
      map((response: BackendResponse<StreamingConfigResponse>) => {
        if (response.error) {
          throw new Error(response.error.error_message);
        }
        if (response.success) {
          return response.success;
        }
        throw new Error('Unexpected response format');
      })
    );
  }

  @undoable(2000)
  getUpdatedStreamingConfig() {
    console.log('Requesting updated config');
    const apiUrl = `${environment.apiUrl}/${environment.apiVersion}/pam-system/streaming-configuration/update`;
    this.http.get<BackendResponse<CommunicationResultResponse>>(apiUrl).subscribe({
      next: (response: BackendResponse<CommunicationResultResponse>) => {
        if (response.error) {
          throw new Error(response.error.error_message);
        }
        if (response.success) {
          console.log('Updated config:', response.success);
        }
      }
    });
  }


  setConfig(waveformConfig: StreamingWaveformConfig, spectrumConfig: StreamingSpectrumConfig): Observable<BackendResponse<CommunicationResultResponse>> {
    const apiUrl = `${environment.apiUrl}/${environment.apiVersion}/pam-system/streaming-configuration/set`;
    return this.http.post<BackendResponse<CommunicationResultResponse>>(apiUrl, {
      wav_config: waveformConfig,
      fft_config: spectrumConfig
    }).pipe(
      map((response: BackendResponse<CommunicationResultResponse>) => {
        if (response.error) {
          throw new Error(response.error.error_message);
        }
        return response;
      })
    );
  }


}

