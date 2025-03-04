import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationService, LocationResult } from '../location-interfaces';

export interface StructuredQuery {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalcode?: string;
  [key: string]: any; // Permite agregar otros parámetros si es necesario
}

export interface NominatimResponseItem {
  display_name: string;
  lat: string;
  lon: string;
  address: any;
}

@Injectable({
  providedIn: 'root'
})
export class NominatimLocationService implements LocationService {

  private readonly baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  /**
   * Realiza una búsqueda de direcciones utilizando la API de Nominatim.
   * @param query Una cadena para consultas libres o un objeto para consultas estructuradas.
   * @param structured Indica si la consulta es estructurada (true) o libre (false).
   * @returns Un observable con los resultados de la búsqueda.
   */
  searchAddress(query: string | StructuredQuery, structured: boolean = false): Observable<LocationResult[]> {
    const params = this.buildQueryParams(query, structured);

    return this.http.get<NominatimResponseItem[]>(this.baseUrl, { params }).pipe(
      map(response => response.map(item => this.transformToLocationResult(item)))
    );
  }

  /**
   * Construye los parámetros de la consulta para la solicitud HTTP.
   * @param query La consulta proporcionada por el usuario.
   * @param structured Indica si la consulta es estructurada.
   * @returns Un objeto HttpParams listo para la solicitud HTTP.
   */
  private buildQueryParams(query: string | StructuredQuery, structured: boolean): HttpParams {
    let params = new HttpParams();

    if (structured && typeof query === 'object') {
      Object.entries(query).forEach(([key, value]) => {
        if (value) {
          params = params.append(key, value);
        }
      });
    } else if (typeof query === 'string') {
      params = params.append('q', query);
    }

    // Añadimos parámetros comunes
    return params.append('format', 'json')
      .append('addressdetails', '1')
      .append('limit', '5');
  }

  /**
   * Transforma la respuesta de Nominatim en un formato estandarizado LocationResult.
   * @param item Un elemento de la respuesta de Nominatim.
   * @returns Un objeto LocationResult con los detalles de la localización.
   */
  private transformToLocationResult(item: NominatimResponseItem): LocationResult {
    return {
      displayName: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      addressDetails: item.address
    };
  }
}

