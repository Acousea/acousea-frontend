import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {NodeMonitorPanelComponent} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";
import {IridiumReportingModule, LoraReportingModule, OperationModes} from "@/app/global-interfaces/nodes/ExtModules";

@Component({
  selector: 'app-reporting-periods-monitor-panel',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './reporting-periods-monitor-panel.component.html',
  styleUrls: ['../node-config.component.css']
})
export class ReportingPeriodsMonitorPanel extends NodeMonitorPanelComponent<{
  operationModes: OperationModes,
  loRaReporting: LoraReportingModule,
  iridiumReporting: IridiumReportingModule
}> {


  constructor() {
    super(true);
  }


  updateLoRaReporting(key: number, value: EventTarget | null) {
    const val = (value as HTMLInputElement).value;
    console.warn('updateLoRaReporting', key, val);
    if (this.data?.loRaReporting?.reportingPeriodsPerOperationModeIdx) {
      this.data.loRaReporting.reportingPeriodsPerOperationModeIdx[key] = Number(val);
    }
  }

  updateIridiumReporting(key: number, value: EventTarget | null) {
    const val = (value as HTMLInputElement).value;
    console.warn('updateIridiumReporting', key, val);
    if (this.data?.iridiumReporting?.reportingPeriodsPerOperationModeIdx) {
      this.data.iridiumReporting.reportingPeriodsPerOperationModeIdx[key] = Number(val);
    }
  }


  objectEntries(obj: { [key: number]: number }): { key: number, value: number }[] {
    return Object.entries(obj).map(([key, value]) => ({ key: Number(key), value }));
  }


  override getTitle(): string {
    return "reportingPeriods";
  }

  protected readonly HTMLInputElement = HTMLInputElement;
}
