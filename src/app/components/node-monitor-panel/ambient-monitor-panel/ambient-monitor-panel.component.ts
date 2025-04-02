import {Component} from '@angular/core';
import {NgStyle} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {
  ReadonlyNodeMonitorPanelComponent
} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";
import {AmbientModule} from "@/app/global-interfaces/nodes/ExtModules";

@Component({
  selector: 'app-ambient-monitor-panel',
  standalone: true,
  imports: [
    NgStyle,
    TranslateModule
  ],
  templateUrl: './ambient-monitor-panel.component.html',
  styleUrl: './ambient-monitor-panel.component.css'
})
export class AmbientMonitorPanelComponent extends ReadonlyNodeMonitorPanelComponent<AmbientModule> {

  getTitle(): string {
    return "ambient"
  }

  constructor() {
    super();
  }

  getTemperatureColor(): string {
    if (this.data.temperature > 30) {
      return '#ff5733'; // Hot - Red
    } else if (this.data.temperature > 20) {
      return '#ffa500'; // Warm - Orange
    } else if (this.data.temperature > 10) {
      return '#ffff00'; // Mild - Yellow
    } else {
      return '#1e90ff'; // Cold - Blue
    }
  }
}
