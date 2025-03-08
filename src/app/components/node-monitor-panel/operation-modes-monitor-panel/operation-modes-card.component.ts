import {AfterViewInit, Component, ElementRef, HostListener} from '@angular/core';
import {NodeMonitorPanelComponent} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";
import {OperationModes, OperationModesGraph} from "@/app/global-interfaces/nodes/ExtModules";
import {GraphService} from "@/app/components/node-monitor-panel/operation-modes-monitor-panel/graph.service";


@Component({
  selector: 'app-operation-modes-monitor-panel',
  templateUrl: './operation-modes-card.component.html',
  styleUrls: ['./operation-modes-card.component.scss']
})
export class OperationModesMonitorPanelComponent extends NodeMonitorPanelComponent<{
  modes: OperationModes;
  graph: OperationModesGraph
}> implements AfterViewInit {
  contextMenuVisible = false;
  contextMenuPosition = {x: 0, y: 0};

  constructor(private el: ElementRef, private graphService: GraphService) {
    super();
  }

  getTitle(): string {
    return "operationModes";
  }

  ngAfterViewInit() {
    this.graphService.initializeGraph(this.el, this.data);

    // Listen for right-click events on nodes
    this.graphService.cy.on('cxttap', 'node', (event) => {
      event.originalEvent.preventDefault();
      this.showContextMenu(event.originalEvent, event.target.id());
    });

    // Close the menu when clicking anywhere else
    this.graphService.cy.on('tap', () => {
      this.hideContextMenu();
    });
  }

  /** Show the context menu at cursor position */
  private showContextMenu(event: MouseEvent, nodeId: string) {
    this.contextMenuPosition = {x: event.clientX, y: event.clientY};
    this.contextMenuVisible = true;
    this.graphService.selectedNodeId = nodeId;
  }

  /** Hide the context menu */
  private hideContextMenu() {
    this.contextMenuVisible = false;
  }

  /** Add a new node */
  addNode() {
    this.graphService.addNode(this.data);
  }

  /** Edit the node */
  editNode() {
    this.hideContextMenu();
    this.graphService.editNodeLabel();
  }

  /** Delete the node */
  deleteNode() {
    this.hideContextMenu();
    this.graphService.deleteNode(this.data);
  }

  /** Start edge creation */
  startEdgeCreation() {
    this.hideContextMenu();
    this.graphService.startEdgeCreation();
  }

  /** Close menu when clicking outside */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('.context-menu')) {
      this.hideContextMenu();
    }
  }


}
