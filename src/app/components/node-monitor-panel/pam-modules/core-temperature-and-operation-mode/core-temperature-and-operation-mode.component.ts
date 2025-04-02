import {Component} from '@angular/core';
import {NgStyle, SlicePipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {
  ReadonlyNodeMonitorPanelComponent
} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";

@Component({
  selector: 'app-core-temperature-and-operation-mode',
  standalone: true,
  imports: [
    NgStyle,
    TranslateModule,
    SlicePipe
  ],
  templateUrl: './core-temperature-and-operation-mode.component.html',
  styleUrl: './core-temperature-and-operation-mode.component.css'
})
export class CoreTemperatureAndOperationModeComponent extends ReadonlyNodeMonitorPanelComponent<{
  coreTemperature: number,
  operationModeIdx: number
}> {
  operationModes: string[] = ['None', 'Launching', 'Working', 'Recovering'];

  getTitle(): string {
    return "core-temperature-and-operation-mode";
  }

  constructor() {
    super();
  }

  getTemperatureColor(): string {
    switch (true) {
      case this.data.coreTemperature > 85:
        return 'rgb(246,0,0)'; // Hot - Red
      case this.data.coreTemperature > 70:
        return 'rgb(237,131,0)'; // Warm - Orange
      case this.data.coreTemperature > 50:
        return 'rgb(251,201,0)'; // Mild - Yellow
      default:
        return 'rgba(30,144,255,1)'; // Cool - Blue
    }
  }

  getOperationModeColor(): string {
    switch (this.data.operationModeIdx) {
      case 1:
        return 'rgba(76,175,80,0.4)'; // Green for Launching
      case 2:
        return 'rgba(33,150,243,0.4)'; // Blue for Working
      case 3:
        return 'rgba(244,67,54,0.4)'; // Red for Recovering
      default:
        return 'rgba(0,0,0,0.4)'; // Black for unknown
    }
  }

  getOpModeLetterColor() {
    switch (this.data.operationModeIdx) {
      case 1:
        return 'rgba(76,175,80,1)'; // Green for Launching
      case 2:
        return 'rgba(33,150,243,1)'; // Blue for Working
      case 3:
        return 'rgba(244,67,54,1)'; // Red for Recovering
      default:
        return 'rgba(0,0,0,1)'; // Black for unknown
    }

  }
}
