import { Injectable } from '@angular/core';
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {ApiService} from "@/app/services/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class NodeCostEstimationService {

  private previousState: NodeDevice | undefined = undefined;

  constructor(private apiService: ApiService) {}

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

    return this.apiService.post('/api/estimate-cost', payload);
  }
}
