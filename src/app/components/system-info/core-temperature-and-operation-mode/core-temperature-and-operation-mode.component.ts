import {Component, Input} from '@angular/core';
import {NgStyle, SlicePipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

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
export class CoreTemperatureAndOperationModeComponent {
  @Input() coreTemperature: number = 0; // Celsius
  @Input() operationModeIdx: number = 1; // 1: Launching, 2: Working, 3: Recovering

  operationModes: string[] = ['None', 'Launching', 'Working', 'Recovering'];

  constructor() {
  }

  getTemperatureColor(): string {
    if (this.coreTemperature > 85) {
      return 'rgb(246,0,0)'; // Hot - Red
    } else if (this.coreTemperature > 70) {
      return 'rgb(237,131,0)'; // Warm - Orange
    } else if (this.coreTemperature > 50) {
      return 'rgb(251,201,0)'; // Mild - Yellow
    } else {
      return 'rgba(30,144,255,1)'; // Cool - Blue
    }
  }

  getOperationModeColor(): string {
    switch (this.operationModeIdx) {
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
    switch (this.operationModeIdx) {
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
