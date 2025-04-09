import {Injectable} from '@angular/core';
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {BehaviorSubject, distinctUntilChanged, filter, Observable, switchMap} from "rxjs";
import {NodeSelectionService} from "@/app/services/node-context/node-selection-service/node-selection.service";
import {
  NodeCostEstimationPayload,
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
    private nodeSelectionService: NodeSelectionService,
    private nodeEstimationService: NodeCostEstimationService,
    private nodeConfigurationService: NodeConfigurationService
  ) {
    // Load nodes once on service initialization
    this.resetNodes()
  }

  public resetNodes(defaultSelectedNodeId?: string) {
    this.nodeConfigurationService.getNodes().subscribe(nodes => {
      this.nodesSubject.next(nodes);

      if (!defaultSelectedNodeId) {
        // If no nodeId is provided, set the first node as selected
        if (nodes.length <= 0) {
          console.warn("No nodes available");
          return;
        }
        this.nodeSelectionService.setSelectedNode(nodes[0]);
        return;
      }
      const node = nodes.find(node => node.id === defaultSelectedNodeId);
      if (!node) {
        console.warn("Node not found", defaultSelectedNodeId);
        return;
      }
      this.nodeSelectionService.setSelectedNode(node);


    });
  }

  // Accessor for single-fetch node list
  getAllNodes(): Observable<NodeDevice[]> {
    return this.nodes$;
  }

  get selectedNode$(): Observable<NodeDevice | undefined> {
    return this.nodeSelectionService.selectedNode$;
  }

  observeChanges(): Observable<Partial<NodeDevice> | undefined> {
    return this.nodeSelectionService.changes$;
  }

  updateNode(partial: Partial<NodeDevice>): void {
    this.nodeSelectionService.applyPartialUpdate(partial);
  }

  // Config actions
  applyChanges(): void {
    console.warn("Applying node configuration ->", this.nodeSelectionService.selectedNodeSnapshot);
    this.nodeConfigurationService.setNodeConfiguration(this.nodeSelectionService.selectedNodeSnapshot!);
  }

  discardChanges(): void {
    // Here we need to get the node from the nodes list with the same ID as the selected node
    const nodeId = this.nodeSelectionService.selectedNodeSnapshot?.id;
    console.warn("Discarding changes ->", nodeId);
    this.resetNodes(nodeId);
  }

  estimatePacketSize(changes: Partial<NodeDevice>): Promise<NodeCostEstimationPayload | undefined>{
    // Estimate the packet size
    const packetSize = this.nodeEstimationService.pollCostIfNeeded(changes);
    console.warn("Estimated packet size ->", packetSize);
    return packetSize;

  }
}
