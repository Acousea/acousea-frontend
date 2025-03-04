import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ApiResponse} from "../../global-interfaces/global-interfaces";
import {BackendRoutePaths} from "../../app.route.paths";


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

  constructor(private httpClient: HttpClient) {
  }

  async getStats(): Promise<StatsReadModel | undefined> {
    const response: ApiResponse<StatsReadModel> = await firstValueFrom(
      this.httpClient.get<ApiResponse<StatsReadModel>>(BackendRoutePaths.pamSystem.latestStats)
    );
    if (response.value) {
      console.log('Stats: ', response.value);
      return response.value;
    } else {
      console.error('Stats failed: ' + response.error?.error_message);
      return undefined;
    }
  }

}
