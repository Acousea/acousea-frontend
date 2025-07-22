import {ElementRef, Injectable} from '@angular/core';
import cytoscape from 'cytoscape';
import klay from 'cytoscape-klay';
import {OperationModes, OperationModesGraph} from "@/app/global-interfaces/nodes/ExtModules";
import {Subject} from "rxjs";

export interface SelectionEvent {
  type: 'node' | 'edge' | 'elsewhere'
  id: string;
}

export interface OptionsEvent {
  type: 'node' | 'edge' | 'elsewhere'
  position?: { x: number; y: number };
  id: string;
}


@Injectable({
  providedIn: 'root'
})
export class GraphUIService {
  private _cy!: cytoscape.Core;
  private readonly colorPalette = ['#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#90e0ef', '#ade8f4'];
  public selectionEventSubject$ = new Subject<SelectionEvent>();
  public optionsEventSubject$ = new Subject<OptionsEvent>();


  get cy(): cytoscape.Core {
    return this._cy;
  }

  constructor() {
    cytoscape.use(klay);
  }

  /** Initialize Cytoscape */
  initUI(cyContainer: ElementRef<any>, data: { operationModes: OperationModes; operationModesGraph: OperationModesGraph; }) {
    console.warn("Initializing Cytoscape with data:", data);
    const {operationModes, operationModesGraph} = data;

    const nodes = Object.entries(operationModes.modes).map(([id, label], index) => ({
      data: {id, label, color: this.colorPalette[index % this.colorPalette.length]}
    }));

    const edges = Object.entries(operationModesGraph.graph)
      .filter(([sourceId]) => nodes.some(node => node.data.id === sourceId))
      .map(([sourceId, {targetMode, duration}]) => ({
        data: {id: `${sourceId}-${targetMode}`, source: sourceId, target: targetMode.toString(), label: `${duration}s`}
      }));

    const selectedCyDiv = cyContainer.nativeElement.querySelector('#cy');
    if (!selectedCyDiv) {
      console.error("Cytoscape container not found in the provided element.", cyContainer.nativeElement);
      return;
    }

    this._cy = cytoscape({
      container: selectedCyDiv,
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
      layout: {
        name: 'circle',
        padding: 10,

        ready: () => {
          console.log("Cytoscape layout is ready.");
        },
        stop: () => {
          console.log("Cytoscape layout has stopped.");
        }

      },
      zoomingEnabled: false,

    });

    this._cy.viewport(
      {
        zoom: 0,
        pan: {x: 0, y: 0}
      }
    )
    this._cy.resize();
    this._cy.fit();
    this._cy.center();

    console.log("Cytoscape initialized with elements:", this._cy.elements());

    this._cy.on('tap', 'node', (event) => {
      const selectedNodeId = event.target.id();
      this.selectionEventSubject$.next({type: 'node', id: selectedNodeId});
    });

    this._cy.on('tap', 'edge', (event) => {
      const selectedEdgeId = event.target.id();
      this.selectionEventSubject$.next({type: 'edge', id: selectedEdgeId});
    });

    this._cy.on('tap', (event) => {
      if (event.target === this._cy) {
        this.selectionEventSubject$.next({type: 'elsewhere', id: ''});
      }
    });

    this._cy.on('cxttap', 'node', (event) => {
      const selectedNodeId = event.target.id();
      if (!selectedNodeId) {
        console.warn("No node selected for right-click action.");
        return
      }
      this.selectionEventSubject$.next({type: 'node', id: selectedNodeId});
      this.optionsEventSubject$.next({type: 'node', position: event.position, id: selectedNodeId});
    });

    this._cy.on('cxttap', 'edge', (event) => {
      const selectedEdgeId = event.target.id();
      if (!selectedEdgeId) {
        console.warn("No edge selected for right-click action.");
        return
      }
      this.selectionEventSubject$.next({type: 'edge', id: selectedEdgeId});
      this.optionsEventSubject$.next({type: 'edge', position: event.position, id: selectedEdgeId});
    });

    this._cy.on('cxttap', (event) => {
      if (event.target === this._cy) {
        this.selectionEventSubject$.next({type: 'elsewhere', id: ''});
        this.optionsEventSubject$.next({type: 'elsewhere', id: ''});
      }
    });

  }

  /** Add a new node */
  addNode(newData: { newId: string; newLabel: string }) {
    const {newId, newLabel} = newData;
    try {
      this._cy.add({
        group: 'nodes',
        data: {id: newId, label: newLabel, color: this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)]}
      });
    } catch (error) {
      console.error(`❌ Error al añadir el nodo '${newId}':`, error);
      alert(`Error: no se puede crear un nodo con el ID '${newId}' porque ya existe.`);
      return;
    }

  }

  /** Delete selected node */
  deleteNode(selectedNodeId: string | null) {
    if (!selectedNodeId) {
      alert("Select a node first!");
      return;
    }

    this._cy.getElementById(selectedNodeId).remove();
  }

  /** Add a new edge */
  addEdge(edgeInfo: { source: string, target: string, duration: number, edgeId: string }) {
    const {source, target, duration, edgeId} = edgeInfo;

    try {
      this._cy.add({
        group: 'edges',
        data: {
          id: edgeId,
          source: source,
          target: target,
          label: `${duration}s`
        }
      });
    } catch (error) {
      console.error(`❌ Error al añadir la arista '${edgeId}':`, error);
      alert(`Error: no se puede crear una segunda arista con el mismo ID '${edgeId}'`);
      return;
    }
  }

  /** Delete selected edge */
  deleteEdge(edgeId: string) {
    this._cy.getElementById(edgeId).remove();
  }

  /** Edit a node's name */
  editNodeLabel(newLabel: string, selectedNodeId: string) {
    this.cy.getElementById(selectedNodeId).data('label', newLabel);
  }

}
