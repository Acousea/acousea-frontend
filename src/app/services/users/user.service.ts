// user.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BackendResponse} from "../../global-interfaces/global-interfaces";
import {User} from "./user.interfaces";
import {map} from "rxjs/operators";
import {BackendRoutePaths} from "../../app.route.paths";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserProfile(userId: string): Observable<User> {
    return this.http.get<BackendResponse<User>>(`${ BackendRoutePaths.user.base}/${userId}`).pipe(
      map((response: BackendResponse<User>) => {
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
}
