import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ModuleCardComponent} from "@/app/components/module-card/Module.card.component";
import {BatteryModule} from "@/app/global-interfaces/nodes/ExtModules";

@Component({
  selector: 'app-battery-card',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule
  ],
  templateUrl: './battery-card.component.html',
  styleUrl: './battery-card.component.css'
})
export class BatteryCardComponent implements OnInit, ModuleCardComponent<BatteryModule> {
  @Input() data: BatteryModule = {batteryStatus: 0, batteryPercentage: 0};
  readonly mutable: boolean = false;

  getTitle(): string {
    return "batteryModule";
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
