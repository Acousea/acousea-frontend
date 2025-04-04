import {Component} from '@angular/core';
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {TranslateModule} from "@ngx-translate/core";
import {NodeContextService} from "@/app/services/node-context/node-context.service";
import {
  ReportingPeriodsMonitorPanel
} from "@/app/components/node-monitor-panel/reporting-periods-monitor-panel/reporting-periods-monitor-panel.component";
import {
  ICListenDataCollectionConfigMonitorPanel
} from "@/app/components/node-monitor-panel/pam-modules/iclisten/iclisten-logging-config-monitor-panel/iclisten-data-collection-config-monitor-panel.component";
import {NgIf} from "@angular/common";
import {ICListenHF, ICListenLoggingConfig, ICListenStreamingConfig} from "@/app/global-interfaces/nodes/PamModules";
import {
  ICListenStreamingConfigMonitorPanelComponent
} from "@/app/components/node-monitor-panel/pam-modules/iclisten/iclisten-streaming-config-monitor-panel/iclisten-streaming-config-monitor-panel.component";
import {ExtModule} from "@/app/global-interfaces/nodes/ExtModules";

type ViewMode = 'reporting' | 'streaming' | 'pam' | 'all';

@Component({
  selector: 'app-node-settings-section',
  standalone: true,
  imports: [
    TranslateModule,
    ReportingPeriodsMonitorPanel,
    ICListenDataCollectionConfigMonitorPanel,
    NgIf,
    ICListenStreamingConfigMonitorPanelComponent
  ],
  templateUrl: './node-settings-section.component.html',
  styleUrl: './node-settings-section.component.css'
})
export class NodeSettingsSectionComponent {
  selectedNode: NodeDevice | undefined;
  currentView: ViewMode = 'reporting';

  constructor(
    protected nodeContext: NodeContextService
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
      return this.selectedNode.pamModules.iclistenHF
    }
    return undefined;
  }


  onReportingPeriodsUpdate($event: Partial<ExtModule>) {
    // Rebuild all extmodule adding the new changes
    const updatedExtModules: { extModules: ExtModule } =
      {
        extModules: {
          ...this.selectedNode?.extModules,
          ...$event
        }
      }

    this.nodeContext.updateNode(updatedExtModules);
  }

  onStreamingConfigUpdate($event: Partial<{ streamingConfig: ICListenStreamingConfig }>) {


  }

  onDataCollectionConfigUpdate($event: Partial<{ loggingConfig: ICListenLoggingConfig }>) {

  }
}
