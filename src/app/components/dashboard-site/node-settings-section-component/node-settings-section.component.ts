import {Component} from '@angular/core';
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {TranslateModule} from "@ngx-translate/core";
import {NodeContextService} from "@/app/services/node-context/node-context.service";
import {
  ReportingPeriodsMonitorPanel
} from "@/app/components/node-monitor-panel/reporting-periods-monitor-panel/reporting-periods-monitor-panel.component";
import {
  ICListenStreamingConfigMonitorPanelComponent
} from "@/app/components/node-monitor-panel/pam-modules/streaming-config/iclisten-streaming-config-monitor-panel.component";
import {
  ICListenDataCollectionConfigMonitorPanel
} from "@/app/components/node-monitor-panel/pam-modules/pam-system-config/iclisten-data-collection-config-monitor-panel.component";
import {NgIf} from "@angular/common";
import {ICListenHF} from "@/app/global-interfaces/nodes/PamModules";

type ViewMode = 'reporting' | 'streaming' | 'pam' | 'all';

@Component({
  selector: 'app-node-settings-section',
  standalone: true,
  imports: [
    TranslateModule,
    ReportingPeriodsMonitorPanel,
    ICListenStreamingConfigMonitorPanelComponent,
    ICListenDataCollectionConfigMonitorPanel,
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

  getICListenModuleIfPresent(): ICListenHF | undefined {
    if (this.selectedNode?.pamModules) {
      return this.selectedNode.pamModules.find(module => module.name === 'ICListenHF') as ICListenHF;
    }
    return undefined;
  }

}
