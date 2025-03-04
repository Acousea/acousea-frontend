import {Component} from '@angular/core';
import {SummaryCardComponent} from "../../cards/summary-card/summary-card.component";
import {LineChartComponent} from "../../charts/line-chart/line-chart.component";
import {TranslateModule} from "@ngx-translate/core";
import {NodeDevice} from "../../../global-interfaces/nodes/NodeDevice";
import {ChartInputData} from "../../../sites/summary-site/summary-site.component";
import {BackendRoutePaths} from "../../../app.route.paths";
import {SelectedNodeService} from "../../../services/selected-node-service/selected-node.service";
import {pamModuleTypes} from "../../../global-interfaces/nodes/PamModules";
import {NodeDevicesService} from "../../../services/node-devices-service/node-devices.service";

@Component({
  selector: 'app-summary-stats-component',
  standalone: true,
  imports: [
    TranslateModule,
    SummaryCardComponent,
    LineChartComponent
  ],
  templateUrl: './summary-stats-component.component.html',
  styleUrl: './summary-stats-component.component.css'
})
export class SummaryStatsComponentComponent {
  node: NodeDevice | undefined;
  clickData: ChartInputData | undefined = undefined;

  clicks: number[] = [];
  timestamps: number[] = []
  numClicks: number = 0;
  numFiles: number = 0;
  numMinutes: number = 0;
  numReports: number = 0;

  constructor(
    private nodeDevicesService: NodeDevicesService,
    private selectedNodeService: SelectedNodeService
  ) {
    console.log("SummaryStatsComponentComponent.constructor() -> ", this.node);
    selectedNodeService.selectedNode$.subscribe((node) => this.loadStats(node));
  }

  private loadStats(node: NodeDevice | undefined) {
    this.node = node;
    if (!node) {
      return;
    }
    const iclistenHF = node.pamModules.find((module) => module.name === pamModuleTypes.ICListenHF);
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
