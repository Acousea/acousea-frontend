import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AlertPopUpService} from "../pop-ups-services/alert-popup/alert-pop-up.service";
import {ApiResponse} from "../../global-interfaces/global-interfaces";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient, private alertPopupService: AlertPopUpService) {
  }

  private handleApiResponse<T>(observable: Observable<ApiResponse<T>>): Observable<T> {
    return observable.pipe(
      map((response) => {
        if (response.success && response.value !== undefined) {
          return response.value;
        }

        if (response.error) {
          const errorMessage = `Error ${response.error.error_code}: ${response.error.error_message}`;
          this.alertPopupService.showErrorMessage(errorMessage);
          throw new Error(errorMessage);
        }

        throw new Error('Unexpected response format');
      }),
      catchError((error) => {
        this.alertPopupService.showErrorMessage(error.message || 'An unknown error occurred');
        throw error; // Re-throw the error for further handling
      })
    );
  }


  // GET Method
  public get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.handleApiResponse<T>(
      this.httpClient.get<ApiResponse<T>>(url, {params})
    );
  }

  // POST Method
  public post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.handleApiResponse<T>(
      this.httpClient.post<ApiResponse<T>>(url, body, {headers})
    );
  }

  // PUT Method
  public put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.handleApiResponse<T>(
      this.httpClient.put<ApiResponse<T>>(url, body, {headers})
    );
  }

  // PATCH Method
  public patch<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.handleApiResponse<T>(
      this.httpClient.patch<ApiResponse<T>>(url, body, {headers})
    );
  }

  // DELETE Method
  public delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.handleApiResponse<T>(
      this.httpClient.delete<ApiResponse<T>>(url, {params, headers})
    );
  }

  public request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    options: {
      body?: any;
      params?: HttpParams;
      headers?: HttpHeaders;
    }
  ): Observable<T> {
    return this.handleApiResponse<T>(
      this.httpClient.request<ApiResponse<T>>(method, url, options)
    );
  }
}
