import { Input, Directive } from '@angular/core';

export interface IModuleCardComponent<T> {
  data: T; // Module-specific data
  mutable: boolean; // Defines if the module is configurable

  getTitle(): string; // Each module should define a title
}

@Directive() // Can be used as a base class for components
export abstract class ModuleCardComponent<T> implements IModuleCardComponent<T> {
  @Input() data!: T; // Module-specific data
  @Input() mutable!: boolean; // Defines if the module is configurable

  abstract getTitle(): string; // Each module should define a title
}
