import { Component } from '@angular/core';
import {NodeMonitorPanelComponent} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";
import {ReportingModule} from "@/app/global-interfaces/nodes/ExtModules";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-reporting-monitor-panel',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './reporting-monitor-panel.component.html',
  styleUrl: './reporting-monitor-panel.component.css'
})
export class ReportingMonitorPanelComponent extends NodeMonitorPanelComponent<ReportingModule> {
  constructor() {
    super(true); // This component is writable
  }

  getTitle(): string {
    return "Reporting Configuration";
  }

  /** Update a reporting period */
  updateReportingPeriod(index: number, event: Event) {
    if (!this.mutable) return;
    const inputValue = Number((event.target as HTMLInputElement).value);
    if (!isNaN(inputValue) && inputValue >= 0) {
      this.data.reportingPeriodsPerOperationModeIdx[index] = inputValue;
    }
  }

  getReportingPeriods() {
    return Object.entries(this.data.reportingPeriodsPerOperationModeIdx).map(([key, value]) => ({
      key: Number(key),
      value
    }));
  }

}
