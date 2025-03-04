import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NodeDevice } from '../../global-interfaces/nodes/NodeDevice';

@Injectable({
  providedIn: 'root'
})
export class SelectedNodeService {
  private selectedNodeSubject = new BehaviorSubject<NodeDevice | undefined>(undefined);
  private originalNodeSubject = new BehaviorSubject<NodeDevice | undefined>(undefined);

  // Observable para acceder al nodo seleccionado
  selectedNode$: Observable<NodeDevice | undefined> = this.selectedNodeSubject.asObservable();

  // Método para actualizar el nodo seleccionado
  setSelectedNode(node: NodeDevice): void {
    this.originalNodeSubject.next(node);
    this.selectedNodeSubject.next(node);
  }

  // Método para obtener los cambios como un Partial<NodeDevice>
  getChanges(): Partial<NodeDevice> | undefined {
    const selectedNode = this.selectedNodeSubject.value;
    const originalNode = this.originalNodeSubject.value;

    if (!selectedNode || !originalNode) {
      console.error(this.constructor.name + ': No nodes selected')
      return undefined; // Si no hay nodos seleccionados, no hay cambios
    }

    return this.calculateChanges(originalNode, selectedNode);
  }

  // Helper para calcular los cambios recursivamente
  private calculateChanges<T>(original: T, modified: T): Partial<T> {
    const changes: Partial<T> = {};

    for (const key in modified) {
      if (!Object.prototype.hasOwnProperty.call(modified, key)) {
        continue;
      }

      const originalValue = (original as any)[key];
      const modifiedValue = (modified as any)[key];

      if (typeof originalValue === 'object' && typeof modifiedValue === 'object' && originalValue !== null && modifiedValue !== null) {
        const nestedChanges = this.calculateChanges(originalValue, modifiedValue);
        if (Object.keys(nestedChanges).length > 0) {
          (changes as any)[key] = nestedChanges;
        }
      } else if (originalValue !== modifiedValue) {
        (changes as any)[key] = modifiedValue;
      }
    }

    return changes;
  }
}

