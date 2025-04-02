import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

import {BatteryModule} from "@/app/global-interfaces/nodes/ExtModules";
import {
  ReadonlyNodeMonitorPanelComponent
} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";

@Component({
  selector: 'app-battery-monitor-panel',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule
  ],
  templateUrl: './battery-monitor-panel.component.html',
  styleUrl: './battery-monitor-panel.component.css'
})
export class BatteryMonitorPanelComponent extends ReadonlyNodeMonitorPanelComponent<BatteryModule> implements OnInit {
  getTitle(): string {
    return "batteryModule";
  }

  constructor() {
    super();
  }

  batteryStatusText: string = '';

  ngOnInit(): void {
    this.updateBatteryStatusText();
  }

  updateBatteryStatusText(): void {
    switch (this.data.batteryStatus) {
      case 1:
        this.batteryStatusText = 'BATTERY.STATUS.CHARGING';
        break;
      case 2:
        this.batteryStatusText = 'BATTERY.STATUS.DISCHARGING';
        break;
      case 3:
        this.batteryStatusText = 'BATTERY.STATUS.NOT_CHARGING_OR_DISCHARGING';
        break;
      default:
        this.batteryStatusText = 'BATTERY.STATUS.UNKNOWN';
        break;
    }
  }

  getBatteryLevelClass(): string {
    if (this.data.batteryPercentage > 75) {
      return 'battery-full';
    } else if (this.data.batteryPercentage > 50) {
      return 'battery-three-quarters';
    } else if (this.data.batteryPercentage > 25) {
      return 'battery-half';
    } else if (this.data.batteryPercentage > 10) {
      return 'battery-quarter';
    } else {
      return 'battery-empty';
    }
  }

  isCharging(): boolean {
    return this.data.batteryStatus === 1;
  }
}
