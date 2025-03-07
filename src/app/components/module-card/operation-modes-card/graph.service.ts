import {ElementRef, Injectable} from '@angular/core';
import cytoscape from 'cytoscape';
import klay from 'cytoscape-klay';
import {OperationModes, OperationModesGraph} from "@/app/global-interfaces/nodes/ExtModules";

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private _cy!: cytoscape.Core;
  private readonly colorPalette = ['#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#90e0ef', '#ade8f4'];
  selectedNodeId: string | null = null;
  selectedEdgeId: string | null = null;
  private edgeSourceNode: string | null = null;


  get cy(): cytoscape.Core {
    return this._cy;
  }

  constructor() {
    cytoscape.use(klay);
  }

  /** Initialize Cytoscape */
  initializeGraph(container: ElementRef, data: { modes: OperationModes; graph: OperationModesGraph }) {
    const { modes, graph } = data;

    const nodes = Object.entries(modes.modes).map(([id, label], index) => ({
      data: { id, label, color: this.colorPalette[index % this.colorPalette.length] }
    }));

    const edges = Object.entries(graph.graph)
      .filter(([sourceId]) => nodes.some(node => node.data.id === sourceId))
      .map(([sourceId, { targetMode, duration }]) => ({
        data: { id: `${sourceId}-${targetMode}`, source: sourceId, target: targetMode.toString(), label: `${duration}s` }
      }));

    this._cy = cytoscape({
      container: container.nativeElement.querySelector('#cy'),
      elements: [...nodes, ...edges],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#00b4d8',
            'label': 'data(label)',
            'text-valign': 'center',
            'color': 'white',
            'font-size': '14px',
            'text-outline-width': 2,
            'text-outline-color': 'black',
            'width': 50,
            'height': 50,
            'shape': 'ellipse'
          }
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'width': 2,
            'line-color': '#023e8a',
            'target-arrow-shape': 'triangle',
            'label': 'data(label)',
            'font-size': '12px'
          }
        }
      ],
      layout: { name: 'circle' },
      zoomingEnabled: false
    });

    this._cy.on('tap', 'node', (event) => this.selectedNodeId = event.target.id());
    this._cy.on('tap', 'edge', (event) => this.selectedEdgeId = event.target.id());
  }

  /** Add a new node */
  addNode(data: { modes: OperationModes }) {
    const newId = (Object.keys(data.modes.modes).length + 1).toString();
    const newLabel = `Mode ${newId}`;

    data.modes.modes[Number(newId)] = newLabel;

    this._cy.add({
      group: 'nodes',
      data: { id: newId, label: newLabel, color: this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)] }
    });

    this._cy.layout({ name: 'circle' }).run();
  }

  /** Delete selected node */
  deleteNode(data: { modes: OperationModes }) {
    if (!this.selectedNodeId) {
      alert("Select a node first!");
      return;
    }

    delete data.modes.modes[Number(this.selectedNodeId)];
    this._cy.getElementById(this.selectedNodeId).remove();
    this.selectedNodeId = null;
  }

  /** Add a new edge */
  addEdge(data: { graph: OperationModesGraph }) {
    if (!this.selectedNodeId) {
      alert("Select a source node first!");
      return;
    }

    const targetId = prompt("Enter target node ID:");
    const duration = Number(prompt("Enter duration (seconds):", "5"));

    if (!targetId || isNaN(duration) || duration <= 0) {
      alert("Invalid input.");
      return;
    }

    const edgeId = `${this.selectedNodeId}-${targetId}`;
    data.graph.graph[Number(this.selectedNodeId)] = { targetMode: Number(targetId), duration };

    this._cy.add({
      group: 'edges',
      data: { id: edgeId, source: this.selectedNodeId, target: targetId, label: `${duration}s` }
    });

    this._cy.layout({ name: 'circle' }).run();
  }

  /** Delete selected edge */
  deleteEdge(data: { graph: OperationModesGraph }) {
    if (!this.selectedEdgeId) {
      alert("Select an edge first!");
      return;
    }

    const [source] = this.selectedEdgeId.split("-");
    delete data.graph.graph[Number(source)];

    this._cy.getElementById(this.selectedEdgeId).remove();
    this.selectedEdgeId = null;
  }
  /** Edit a node's name */
  editNodeLabel() {
    if (!this.selectedNodeId) return;
    const newLabel = prompt('Enter new node name:');
    if (newLabel) {
      this.cy.getElementById(this.selectedNodeId).data('label', newLabel);
    }
  }

  /** Start an edge creation from selected node */
  startEdgeCreation() {
    if (!this.selectedNodeId) return;
    this.edgeSourceNode = this.selectedNodeId;
    alert(`Select another node to connect from ${this.edgeSourceNode}`);

    this.cy.on('tap', 'node', (event) => {
      const targetNodeId = event.target.id();
      if (this.edgeSourceNode && this.edgeSourceNode !== targetNodeId) {
        const edgeId = `${this.edgeSourceNode}-${targetNodeId}`;
        this.cy.add({
          group: 'edges',
          data: { id: edgeId, source: this.edgeSourceNode, target: targetNodeId, label: '5s' }
        });
        this.edgeSourceNode = null;
      }
    });
  }
}
