import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../app.config";
import {firstValueFrom} from "rxjs";
import {BackendResponse} from "../../global-interfaces/global-interfaces";

interface StatsReadModel {
  datetime_clicks: { datetime: number, num_clicks: number }[];
  total_num_clicks: number;
  total_recorded_minutes: number;
  total_number_of_files: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private httpClient: HttpClient) {}

  async getStats(): Promise<StatsReadModel | undefined> {
    const response: BackendResponse<StatsReadModel> = await firstValueFrom(
      this.httpClient.get(`${environment.apiUrl}/${environment.apiVersion}/iclisten/latest-stats`)
    );
    if (response.success) {
      console.log('Stats: ',  response.success);
      return response.success;
    } else {
      console.error('Stats failed: ' + response.error?.error_message);
      return undefined;
    }
  }

}
