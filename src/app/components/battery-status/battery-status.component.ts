import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-battery-status',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule
  ],
  templateUrl: './battery-status.component.html',
  styleUrl: './battery-status.component.css'
})
export class BatteryStatusComponent implements OnInit {
  @Input() batteryPercentage: number = 0;
  @Input() batteryStatus: number = 0;

  batteryStatusText: string = '';

  ngOnInit(): void {
    this.updateBatteryStatusText();
  }

  updateBatteryStatusText(): void {
    switch (this.batteryStatus) {
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
    if (this.batteryPercentage > 75) {
      return 'battery-full';
    } else if (this.batteryPercentage > 50) {
      return 'battery-three-quarters';
    } else if (this.batteryPercentage > 25) {
      return 'battery-half';
    } else if (this.batteryPercentage > 10) {
      return 'battery-quarter';
    } else {
      return 'battery-empty';
    }
  }

  isCharging(): boolean {
    return this.batteryStatus === 1;
  }
}
