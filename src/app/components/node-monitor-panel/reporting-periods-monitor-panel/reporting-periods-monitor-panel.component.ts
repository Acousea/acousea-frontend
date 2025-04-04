import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {
  EmitChangesAfter,
  MutableNodeMonitorPanelComponent
} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";
import {IridiumReportingModule, LoraReportingModule, OperationModes} from "@/app/global-interfaces/nodes/ExtModules";
import {WarningComponent} from "@/app/components/shared/warning-component/warning.component";

@Component({
  selector: 'app-reporting-periods-monitor-panel',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    FormsModule,
    NgIf,
    WarningComponent
  ],
  templateUrl: './reporting-periods-monitor-panel.component.html',
  styleUrls: ['../node-config.component.css']
})
export class ReportingPeriodsMonitorPanel extends MutableNodeMonitorPanelComponent<{
  operationModes: OperationModes,
  loRaReporting: LoraReportingModule,
  iridiumReporting: IridiumReportingModule
}> {
  constructor() {
    super();
    console.log("ReportingPeriodsMonitorPanel constructor: ", this.data);
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  updateLoRaReporting(key: number, value: EventTarget | null) {
    const val = (value as HTMLInputElement).value;
    console.warn('updateLoRaReporting', key, val);
    if (this.data?.loRaReporting?.reportingPeriodsPerOperationModeIdx) {
      this.data.loRaReporting.reportingPeriodsPerOperationModeIdx[key] = Number(val);
    }
  }

  @EmitChangesAfter(self => self.emitChange(self.data))
  updateIridiumReporting(key: number, value: EventTarget | null) {
    const val = (value as HTMLInputElement).value;
    console.warn('updateIridiumReporting', key, val);
    if (this.data?.iridiumReporting?.reportingPeriodsPerOperationModeIdx) {
      this.data.iridiumReporting.reportingPeriodsPerOperationModeIdx[key] = Number(val);
    }
  }


  objectEntries(obj: { [key: number]: number }): { key: number, value: number }[] {
    return Object.entries(obj).map(([key, value]) => ({key: Number(key), value}));
  }


  override getTitle(): string {
    return "reportingPeriods";
  }

  protected readonly HTMLInputElement = HTMLInputElement;
}
