import {Component} from '@angular/core';
import {
  ReadonlyNodeMonitorPanelComponent
} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";
import {RTCModule} from "@/app/global-interfaces/nodes/ExtModules";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-rtc-monitor-panel',
  imports: [
    TranslateModule
  ],
  templateUrl: './rtc-monitor-panel.component.html',
  styleUrl: './rtc-monitor-panel.component.css'
})
export class RTCMonitorPanelComponent extends ReadonlyNodeMonitorPanelComponent<RTCModule> {
  getTitle(): string {
    return "rtc";
  }
  constructor() {
    super();
  }


}
