import {Observable} from "rxjs";

export interface LocationResult {
  displayName: string;
  latitude: number;
  longitude: number;
  addressDetails?: any;  // Puede ser más específico según lo que quieras incluir
}


export interface LocationService {
  searchAddress(query: string | object, structured?: boolean): Observable<LocationResult[]>;
}

