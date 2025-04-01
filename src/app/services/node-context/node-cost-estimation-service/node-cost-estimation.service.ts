import { Injectable } from '@angular/core';
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NodeCostEstimationService {

  private previousState: NodeDevice | undefined = undefined;

  constructor(private http: HttpClient) {}

  pollCostIfNeeded(newState: NodeDevice | undefined): Observable<any> {
    if (!newState || !this.previousState ) {
      this.previousState = newState;
      return EMPTY;
    }

    const payload = {
      previous: this.previousState,
      current: newState
    };

    this.previousState = newState;

    return this.http.post('/api/estimate-cost', payload);
  }
}
