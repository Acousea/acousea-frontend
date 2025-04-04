import {Directive, EventEmitter, Input, Output} from '@angular/core';

export interface INodeMonitorPanelComponent<T> {
  data: T; // Module-specific data
  mutable: boolean; // Defines if the module is configurable

  getTitle(): string; // Each module should define a title
}

@Directive() // Can be used as a base class for components
abstract class NodeMonitorPanelComponent<T> implements INodeMonitorPanelComponent<T> {
  @Input() data!: T; // Module-specific data
  readonly mutable: boolean; // Defines if the module is configurable

  protected constructor(mutable: boolean) {
    this.mutable = mutable;
  }

  abstract getTitle(): string; // Each module should define a title

}


@Directive()
export abstract class MutableNodeMonitorPanelComponent<T> extends NodeMonitorPanelComponent<T> {

  protected constructor() {
    super(true);
  }

  @Output() update = new EventEmitter<Partial<T>>();

  protected emitChange(changes: Partial<T>) {
    this.update.emit(changes);
  }

}


export function EmitChangesAfter(fn: (self: any) => void) {
  return function (
    _: any,
    __: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const result = original.apply(this, args);
      if (result instanceof Promise) {
        return result.finally(() => fn(this));
      }
      fn(this);
      return result;
    };
    return descriptor;
  };
}

@Directive()
export abstract class ReadonlyNodeMonitorPanelComponent<T> extends NodeMonitorPanelComponent<T> {
  protected constructor() {
    super(false);
  }
}



