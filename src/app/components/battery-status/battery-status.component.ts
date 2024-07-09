import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-battery-status',
  standalone: true,
  imports: [
    NgIf
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
        this.batteryStatusText = 'Charging';
        break;
      case 2:
        this.batteryStatusText = 'Discharging';
        break;
      case 3:
        this.batteryStatusText = 'Not Charging or Discharging';
        break;
      default:
        this.batteryStatusText = 'Unknown';
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
