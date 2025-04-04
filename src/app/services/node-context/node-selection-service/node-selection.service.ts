import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NodeDevice } from '@/app/global-interfaces/nodes/NodeDevice';

@Injectable({
  providedIn: 'root'
})
export class NodeSelectionService {
  private selectedNodeSubject = new BehaviorSubject<NodeDevice | undefined>(undefined);
  readonly selectedNode$: Observable<NodeDevice | undefined> = this.selectedNodeSubject.asObservable();

  private changesSubject = new BehaviorSubject<Partial<NodeDevice> | undefined>(undefined);
  private readonly _changes$: Observable<Partial<NodeDevice> | undefined> = this.changesSubject.asObservable();

  get selectedNodeSnapshot(): NodeDevice | undefined {
    return this.selectedNodeSubject.value;
  }

  get changes$(): Observable<Partial<NodeDevice> | undefined> {
    return this._changes$;
  }

  get changesSnapshot(): Partial<NodeDevice> | undefined {
    return this.changesSubject.value;
  }

  setSelectedNode(node: NodeDevice): void {
    this.selectedNodeSubject.next(node);
    this.changesSubject.next(undefined); // Reset changes
  }

  applyPartialUpdate(partial: Partial<NodeDevice>): void {
    console.log("Applying partial update", partial);
    const current = this.selectedNodeSubject.value;
    if (!current) {
      console.warn("No current node to update");
      return;
    }

    const updated = { ...current, ...partial };
    this.selectedNodeSubject.next(updated);
    this.changesSubject.next({
      ...this.changesSubject.value,
      ...partial
    });
  }
}
