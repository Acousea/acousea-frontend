import {firstValueFrom} from "rxjs";
import {Injectable} from "@angular/core";
import {BackendRoutePaths} from "../../app.route.paths";
import {ApiService} from "../api-service/api.service";

export interface SingleLatLonUVValues {
  lat: number;
  lon: number;
  u: number | undefined;
  v: number | undefined;
}

// Convert to service

@Injectable({
  providedIn: 'root'
})
export class CurrentVectorsService {
  constructor(private apiService: ApiService) {  }

  async getOceanCurrents(lat: number, lon: number): Promise<SingleLatLonUVValues> {
    const data = await firstValueFrom(this.apiService.get(
      BackendRoutePaths.surfaceFields.latest(lat, lon)
    ));
    return this.parseCurrentVectors(data);

  }
  private parseCurrentVectors(data: any): SingleLatLonUVValues {
    const currentVectors: SingleLatLonUVValues = {
      lat: parseFloat(data.success.latitude),
      lon: parseFloat(data.success.longitude),
      u: (data.success.u_velocity == '--') ? undefined : parseFloat(data.success.u_velocity),
      v: (data.success.v_velocity == '--') ? undefined : parseFloat(data.success.v_velocity)
    };
    console.log('Parsed current vectors:', currentVectors);
    return currentVectors;

  }
}
