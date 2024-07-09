// A static class to provide access to the service

import {Injectable, Injector} from "@angular/core";

/**
 * A static class to provide access to a service from anywhere in the application.
 * This class is initialized in the app.module.ts file.
 *  */

@Injectable({
  providedIn: 'root'
})
export class ServiceLocator {
  static injector: Injector;

  constructor(injector: Injector) {
    ServiceLocator.injector = injector;
  }

  static getService<T>(service: any): T {
    return ServiceLocator.injector.get<T>(service);
  }
}
