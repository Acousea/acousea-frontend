import {Component} from '@angular/core';
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {TranslateModule} from "@ngx-translate/core";
import {NodeContextService} from "@/app/services/node-context/node-context.service";
import {
  ReportingPeriodsMonitorPanel
} from "@/app/components/node-monitor-panel/reporting-periods-monitor-panel/reporting-periods-monitor-panel.component";
import {
  StreamingConfigComponent
} from "@/app/components/node-monitor-panel/pam-modules/streaming-config/streaming-config.component";
import {
  PamSystemConfigComponent
} from "@/app/components/node-monitor-panel/pam-modules/pam-system-config/pam-system-config.component";
import {NgIf} from "@angular/common";

type ViewMode = 'reporting' | 'streaming' | 'pam' | 'all';

@Component({
  selector: 'app-node-settings-section',
  standalone: true,
  imports: [
    TranslateModule,
    ReportingPeriodsMonitorPanel,
    StreamingConfigComponent,
    PamSystemConfigComponent,
    NgIf
  ],
  templateUrl: './node-settings-section.component.html',
  styleUrl: './node-settings-section.component.css'
})
export class NodeSettingsSectionComponent {
  selectedNode: NodeDevice | undefined;
  currentView: ViewMode = 'reporting';

  constructor(
    protected nodeContext: NodeContextService,
  ) {
    nodeContext.selectedNode$.subscribe(node => {
      console.warn('New Selected node', node)
      this.selectedNode = node;
    });
  }

  changeView(view: ViewMode) {
    this.currentView = view;
  }

}
