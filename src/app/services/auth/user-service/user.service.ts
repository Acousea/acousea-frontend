// user.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "./user.interfaces";
import {map} from "rxjs/operators";
import {BackendRoutePaths} from "../../../app.route.paths";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${ BackendRoutePaths.user.base}/${userId}`).pipe(
      map((response: User) => {
        if (response) {
          return response;
        }
        throw new Error('User not found');
      })
    );
  }
}
