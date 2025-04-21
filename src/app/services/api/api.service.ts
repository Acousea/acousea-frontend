import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiResponse} from "../../global-interfaces/global.interface";
import {NotificationService} from "@/app/services/real-time/notification-service/notification.service";
import {Notification} from "@/app/global-interfaces/notification/notification.interface";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {
  }

  private handleApiResponse<T>(observable: Observable<ApiResponse<T>>): Observable<T> {
    return observable.pipe(
      map((response) => {
        if (response.success && response.value !== undefined) {
          return response.value;
        }

        if (response.error) {
          const errorMessage = `Error ${response.error.error_code}: ${response.error.error_message}`;
          throw new Error(errorMessage);
        }

        throw new Error('Unexpected response format');
      }),
      catchError((error) => {
        const errorMessage = error.error || error.message || 'An unknown error occurred';
        console.error("ApiService -> error", errorMessage);
        this.notificationService.pushNotification(
          Notification.error(errorMessage)
        );

        return new Observable<T>((observer) => {
          observer.error(errorMessage);
          observer.complete();
        });
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
