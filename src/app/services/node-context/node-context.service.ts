import {Injectable} from '@angular/core';
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {distinctUntilChanged, Observable, switchMap} from "rxjs";
import {NodeSelectionService} from "@/app/services/node-context/node-selection-service/node-selection.service";
import {
  NodeCostEstimationService
} from "@/app/services/node-context/node-cost-estimation-service/node-cost-estimation.service";
import {
  NodeConfigurationService
} from "@/app/services/node-context/node-configuration-service/node-configuration.service";

@Injectable({providedIn: 'root'})
export class NodeContextService {
  constructor(
    private selectedNodeService: NodeSelectionService,
    private nodeEstimationService: NodeCostEstimationService,
    private nodeConfigurationService: NodeConfigurationService
  ) {
    this.selectedNodeService.selectedNode$
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        switchMap(newState => this.nodeEstimationService.pollCostIfNeeded(newState))
      )
      .subscribe();
  }

  // === FACADE DE FUNCIONES DE SelectedNodeService ===
  setSelectedNode(node: NodeDevice): void {
    this.selectedNodeService.setSelectedNode(node);
  }

  get selectedNode$(): Observable<NodeDevice | undefined> {
    return this.selectedNodeService.selectedNode$;
  }

  getChanges(): Partial<NodeDevice> | undefined {
    return this.selectedNodeService.getChanges();
  }

  // === FACADE DE FUNCIONES DE NodeConfigurationService ===
  getAllNodes(): Observable<NodeDevice[]> {
    return this.nodeConfigurationService.getNodes();
  }

  saveNodeConfiguration(node: NodeDevice): void {
    this.nodeConfigurationService.setNodeConfiguration(node);
  }

  refreshReportingPeriods(): void {
    this.nodeConfigurationService.getUpdatedReportingPeriods();
  }
}

