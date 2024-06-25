import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../app.config";
import {firstValueFrom} from "rxjs";
import {BackendResponse} from "../../global-interfaces/global-interfaces";

interface PingResult {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PingService {

  constructor(private httpClient: HttpClient) {
  }

  async pingServer(): Promise<boolean> {
    let success = false;
    for (let i = 0; i < 4; i++) {
      success = await this.ping();
    }
    return success;
  }

  private async ping(): Promise<boolean> {
    const response: BackendResponse<PingResult> = await firstValueFrom(
      this.httpClient.get(`${environment.apiUrl}/${environment.apiVersion}/ping/localizer`)
    );
    if (response.success) {
      console.log('Ping: ' + response.success.message);
      return true;
    } else {
      console.error('Ping failed: ' + response.error?.error_message);
      return false;
    }
  }

}
