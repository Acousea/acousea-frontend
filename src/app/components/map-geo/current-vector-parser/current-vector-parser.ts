import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

export interface SingleLatLonUVValues {
  lat: number;
  lon: number;
  u: number | undefined;
  v: number | undefined;
}

export class CurrentVectorParser {
  constructor(private httpClient: HttpClient) {  }

  async getOceanCurrents(lat: number, lon: number): Promise<SingleLatLonUVValues> {
    const data = await firstValueFrom(this.httpClient.get(
      `http://localhost:8000/api/v1/surface_fields/latest/${lat}/${lon}/`
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
