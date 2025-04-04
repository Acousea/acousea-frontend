import {Injectable} from '@angular/core';
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {ApiService} from "@/app/services/api/api.service";
import {firstValueFrom} from "rxjs";

import {BackendRoutePaths} from "@/app/routes/backend.route.paths";

export interface NodeCostEstimationPayload {
  bytes: number;
  credits: number;
}

@Injectable({
  providedIn: 'root'
})
export class NodeCostEstimationService {

  constructor(private apiService: ApiService) {
  }

  async pollCostIfNeeded(newState: Partial<NodeDevice> | undefined): Promise<NodeCostEstimationPayload | undefined> {
    // Check if changes are empty
    if (!newState || Object.keys(newState).length === 0) {
      console.warn("No changes detected, packet size is 0");
      return Promise.resolve(undefined);
    }

    const payload = {
      changes: newState
    };

    return await firstValueFrom(
      this.apiService.post<NodeCostEstimationPayload>(BackendRoutePaths.communicationSystem.costEstimation, payload)
    );
  }
}
