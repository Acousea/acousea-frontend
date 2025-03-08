import {Directive, Input} from '@angular/core';

export interface INodeMonitorPanelComponent<T> {
  data: T; // Module-specific data
  mutable: boolean; // Defines if the module is configurable

  getTitle(): string; // Each module should define a title
}

@Directive() // Can be used as a base class for components
export abstract class NodeMonitorPanelComponent<T> implements INodeMonitorPanelComponent<T> {
  @Input() data!: T; // Module-specific data
  readonly mutable: boolean; // Defines if the module is configurable

  protected constructor(mutable: boolean = false) {
    this.mutable = mutable;
  }

  abstract getTitle(): string; // Each module should define a title


}

