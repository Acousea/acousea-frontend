import {ComponentFactoryResolver, Injectable, Injector, Type} from '@angular/core';
import {NodeMonitorPanelComponent} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";

import {SerializableModules} from "@/app/global-interfaces/nodes/ExtModules";
import {
  ReportingMonitorPanelComponent
} from "@/app/components/node-monitor-panel/reporting-monitor-panel/reporting-monitor-panel.component";
import {
  RTCMonitorPanelComponent
} from "@/app/components/node-monitor-panel/rtc-monitor-panel/rtc-monitor-panel.component";
import {
  BatteryMonitorPanelComponent
} from "@/app/components/node-monitor-panel/battery-monitor-panel/battery-monitor-panel.component";
import {
  LocationMonitorPanelComponent
} from "@/app/components/node-monitor-panel/location-monitor-panel/location-monitor-panel.component";
import {
  AmbientMonitorPanelComponent
} from "@/app/components/node-monitor-panel/ambient-monitor-panel/ambient-monitor-panel.component";
import {
  StorageMonitorPanelComponent
} from "@/app/components/node-monitor-panel/storage-monitor-panel/storage-monitor-panel.component";
import {
  OperationModesGraphMonitorPanel
} from "@/app/components/node-monitor-panel/operation-modes-monitor-panel/operation-modes-graph-monitor-panel.component";

@Injectable({
  providedIn: 'root'
})
export class NodeMonitorPanelFactoryService {

  /** Mapping between module keys and corresponding component types */
  private moduleComponentMap: { [key: string]: Type<NodeMonitorPanelComponent<any>> } = {
    rtc: RTCMonitorPanelComponent,
    battery: BatteryMonitorPanelComponent,
    location: LocationMonitorPanelComponent,
    temperature: AmbientMonitorPanelComponent,
    storage: StorageMonitorPanelComponent,
    operationModes: OperationModesGraphMonitorPanel,
    operationModesGraph: OperationModesGraphMonitorPanel,
    loRaReporting: ReportingMonitorPanelComponent,
    iridiumReporting: ReportingMonitorPanelComponent
  };

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /** Returns all components (mutable or non-mutable) */
  getComponents(extModules: SerializableModules, mutable: boolean): NodeMonitorPanelComponent<any>[] {
    return Object.entries(extModules)
      .filter(([key, value]) => value !== undefined) // Only process existing modules
      .map(([key, moduleData]) => {
        const ComponentType = this.moduleComponentMap[key];
        if (!ComponentType) return null;

        // Create a component dynamically
        const factory = this.componentFactoryResolver.resolveComponentFactory(ComponentType);
        const componentRef = factory.create(this.injector);

        // Set component data
        componentRef.instance.data = moduleData;
        // componentRef.instance.mutable = mutable;

        return componentRef.instance;
      })
      .filter(comp => comp !== null) as NodeMonitorPanelComponent<any>[];
  }
}
