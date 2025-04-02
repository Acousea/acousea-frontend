import {Injectable} from '@angular/core';
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {BehaviorSubject, distinctUntilChanged, filter, Observable, switchMap} from "rxjs";
import {NodeSelectionService} from "@/app/services/node-context/node-selection-service/node-selection.service";
import {
  NodeCostEstimationService
} from "@/app/services/node-context/node-cost-estimation-service/node-cost-estimation.service";
import {
  NodeConfigurationService
} from "@/app/services/node-context/node-configuration-service/node-configuration.service";

@Injectable({providedIn: 'root'})
export class NodeContextService {
  private nodesSubject = new BehaviorSubject<NodeDevice[] | null>(null);
  readonly nodes$ = this.nodesSubject.asObservable()
    .pipe(
      filter(nodes => nodes !== null)
    ) as Observable<NodeDevice[]>;

  constructor(
    private selectedNodeService: NodeSelectionService,
    private nodeEstimationService: NodeCostEstimationService,
    private nodeConfigurationService: NodeConfigurationService
  ) {
    // Start polling when selected node changes
    this.selectedNodeService.selectedNode$
      .pipe(
        distinctUntilChanged(
          (a, b) => {
            console.log("NodeContextService -> selectedNode$ -> distinctUntilChanged", a, b);
            const a_str = JSON.stringify(a);
            const b_str = JSON.stringify(b);
            console.log("NodeContextService -> selectedNode$ -> distinctUntilChanged", a_str, b_str);
            return JSON.stringify(a) === JSON.stringify(b)
          }),
        switchMap(newState => this.nodeEstimationService.pollCostIfNeeded(newState))
      )
      .subscribe();

    // Load nodes once on service initialization
    this.nodeConfigurationService.getNodes().subscribe(nodes => {
      this.nodesSubject.next(nodes);

      // Set first node as selected if none selected
      if (!this.selectedNodeService.selectedNodeSnapshot && nodes.length > 0) {
        this.selectedNodeService.setSelectedNode(nodes[0]);
      }
    });
  }

  // Accessor for single-fetch node list
  getAllNodes(): Observable<NodeDevice[]> {
    return this.nodes$;
  }

  // Selected node control
  setSelectedNode(node: NodeDevice): void {
    this.selectedNodeService.setSelectedNode(node);
  }

  get selectedNode$(): Observable<NodeDevice | undefined> {
    return this.selectedNodeService.selectedNode$;
  }

  getChanges(): Partial<NodeDevice> | undefined {
    return this.selectedNodeService.getChanges();
  }

  // Config actions
  saveNodeConfiguration(node: NodeDevice): void {
    this.nodeConfigurationService.setNodeConfiguration(node);
  }

  refreshReportingPeriods(): void {
    this.nodeConfigurationService.getUpdatedReportingPeriods();
  }
}
