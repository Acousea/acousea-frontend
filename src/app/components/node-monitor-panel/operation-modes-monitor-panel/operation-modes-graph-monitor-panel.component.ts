import {AfterViewInit, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {
  MutableNodeMonitorPanelComponent
} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";
import {OperationModes, OperationModesGraph} from "@/app/global-interfaces/nodes/ExtModules";
import {
  GraphUIService,
  SelectionEvent, OptionsEvent
} from "@/app/components/node-monitor-panel/operation-modes-monitor-panel/graph-ui.service";
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-operation-modes-graph-monitor-panel',
  templateUrl: './operation-modes-graph-monitor-panel.component.html',
  imports: [
    TranslateModule
  ],
  styleUrls: ['./operation-modes-graph-monitor-panel.component.scss']
})
export class OperationModesGraphMonitorPanel extends MutableNodeMonitorPanelComponent<{
  operationModes: OperationModes;
  operationModesGraph: OperationModesGraph
}> implements OnInit, AfterViewInit {
  @ViewChild('cyContainer', { static: true }) cyContainer!: ElementRef;

  initialData: {opModes: OperationModes | null, graph: OperationModesGraph | null} = {
    opModes: null, graph: null
  }
  contextMenuVisible = false;
  contextMenuPosition = {x: 0, y: 0};
  currentSelection: SelectionEvent | null = null;
  optionsSelection: OptionsEvent | null = null;

  getTitle(): string {
    return "operationModes";
  }

  constructor(private ngZone: NgZone,
              private graphUIService: GraphUIService) {
    super();


    // Subscribe to the selection events
    this.graphUIService.selectionEventSubject$.subscribe((event: SelectionEvent) => {
      this.currentSelection = event;
      if (event.type === 'elsewhere') {
        this.hideContextMenu();
      }
    });

    this.graphUIService.optionsEventSubject$.subscribe((event: OptionsEvent) => {
      this.optionsSelection = event;
      console.warn("Options event received:", event);
      if (event.type === 'elsewhere') {
        this.hideContextMenu();
        return;
      }
      if (event.position) {
        this.showContextMenu(event.position);
      }
    });
  }

  ngOnInit() {
    this.initialData = {
      opModes: JSON.parse(JSON.stringify(this.data.operationModes)),
      graph: JSON.parse(JSON.stringify(this.data.operationModesGraph))
    };
    console.table(this.initialData.opModes);
    console.table(this.initialData.graph);
  }

  ngAfterViewInit() {

    // this.ngZone.runOutsideAngular(() => {
      this.graphUIService.initUI(this.cyContainer, this.data);
    // });
  }

  /** Show the context menu at cursor position */
  private showContextMenu(position: { x: number, y: number }) {
    this.contextMenuPosition = {x: position.x, y: position.y};
    this.contextMenuVisible = true;
  }

  /** Hide the context menu */
  private hideContextMenu() {
    this.contextMenuVisible = false;
  }

  private validateNewEdgeInput(targetId: string | null, duration: number): boolean {
    return !(!targetId || isNaN(duration) || duration <= 0);

  }

  /** Add a new node */
  addNode() {
    const newId = (Object.keys(this.data.operationModes.modes).length + 1).toString();
    const newLabel = `Mode ${newId}`;
    this.data.operationModes.modes[Number(newId)] = newLabel;

    this.graphUIService.addNode({newId, newLabel});
  }

  /** Add a new edge */
  addEdge() {
    if (!this.currentSelection || this.currentSelection.type !== 'node') {
      alert("Select a source node first!");
      return;
    }
    const sourceSelection = this.currentSelection;

    alert("Left click to select target node.");

    const sub = this.graphUIService.selectionEventSubject$.subscribe(selection => {
      const sourceId = sourceSelection.id;
      if (selection.type !== 'node') {
        alert("You must select a node as target.");
        return;
      }

      const targetId = selection.id;
      const duration = Number(prompt("Enter duration (seconds):", "5"));

      if (!this.validateNewEdgeInput(targetId, duration)) {
        alert("Invalid input.");
        sub.unsubscribe(); // limpieza
        return;
      }

      const edgeId = `${sourceId}-${targetId}`;
      this.data.operationModesGraph.graph[Number(sourceId)] = {targetMode: Number(targetId), duration};

      this.graphUIService.addEdge({source: sourceId, target: targetId, duration: duration, edgeId: edgeId});

      sub.unsubscribe(); // Limpieza tras manejar el evento
    });
  }


  /** Edit the node */
  editNode() {
    this.hideContextMenu();

    if (!this.currentSelection || this.currentSelection.type !== 'node' || !this.currentSelection.id) {
      alert("Select a node first!");
      return;
    }
    const selectedNodeId = this.currentSelection.id;
    if (!this.data.operationModes.modes[Number(selectedNodeId)]) {
      alert("Node not found!");
      return;
    }
    const newLabel = prompt('Enter new node name:');
    if (!newLabel) {
      alert("Node name cannot be empty!");
      return;
    }
    this.data.operationModes.modes[Number(selectedNodeId)] = newLabel;

    this.graphUIService.editNodeLabel(newLabel, selectedNodeId);
  }

  /** Delete the node */
  deleteNode() {
    this.hideContextMenu();
    if (!this.currentSelection || this.currentSelection.type !== 'node') {
      alert("Select a node first!");
      return;
    }
    const selectedNodeId = this.currentSelection.id;
    delete this.data.operationModes.modes[Number(selectedNodeId)];
    this.graphUIService.deleteNode(selectedNodeId);
  }


  /** Delete the edge */
  deleteEdge() {
    this.hideContextMenu();
    if (!this.currentSelection || this.currentSelection.type !== 'edge') {
      alert("Select an edge first!");
      return;
    }
    const selectedEdgeId = this.currentSelection.id;
    delete this.data.operationModesGraph.graph[Number(selectedEdgeId.split("-")[0])];
    this.graphUIService.deleteEdge(selectedEdgeId);
  }


  /** Close menu when clicking outside */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('.context-menu')) {
      this.hideContextMenu();
    }
  }

  resetNodes() {
    this.data = {
      operationModes: JSON.parse(JSON.stringify(this.initialData.opModes)),
      operationModesGraph: JSON.parse(JSON.stringify(this.initialData.graph))
    }

    this.graphUIService.initUI(this.cyContainer, this.data);

    this.hideContextMenu();
  }
}
