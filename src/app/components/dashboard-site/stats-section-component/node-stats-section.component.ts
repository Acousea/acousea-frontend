import {Component} from '@angular/core';
import {SummaryCardComponent} from "../../cards/summary-card/summary-card.component";
import {LineChartComponent} from "../../charts/line-chart/line-chart.component";
import {TranslateModule} from "@ngx-translate/core";
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {ChartInputData} from "@/app/sites/dashboard-site/dashboard-site.component";
import {BackendRoutePaths} from "@/app/app.route.paths";
import {pamModuleTypes} from "@/app/global-interfaces/nodes/PamModules";
import {NodeContextService} from "@/app/services/node-context/node-context.service";

@Component({
  selector: 'app-node-stats-section',
  standalone: true,
  imports: [
    TranslateModule,
    SummaryCardComponent,
    LineChartComponent
  ],
  templateUrl: './node-stats-section.component.html',
  styleUrl: './node-stats-section.component.css'
})
export class NodeStatsSectionComponent {
  node: NodeDevice | undefined;
  clickData: ChartInputData | undefined = undefined;

  clicks: number[] = [];
  timestamps: number[] = []
  numClicks: number = 0;
  numFiles: number = 0;
  numMinutes: number = 0;
  numReports: number = 0;

  constructor(
    private nodeContext: NodeContextService
  ) {
    console.log("SummaryStatsComponentComponent.constructor() -> ", this.node);
    nodeContext.selectedNode$.subscribe((node) => this.loadStats(node));
  }

  private loadStats(node: NodeDevice | undefined) {
    this.node = node;
    if (!node) {
      return;
    }
    const iclistenHF = node.pamModules.iclistenHF;
    if (!iclistenHF) {
      return;
    }
    this.numClicks = iclistenHF.recordingStats.numberOfClicks;
    this.numMinutes = iclistenHF.recordingStats.recordedMinutes;
    this.numFiles = iclistenHF.recordingStats.numberOfFiles;


  }

  protected readonly BackendRoutePaths = BackendRoutePaths;
  protected readonly String = String;
}
