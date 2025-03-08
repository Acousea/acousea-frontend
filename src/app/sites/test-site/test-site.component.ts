import {Component} from '@angular/core';

import {OperationModes, OperationModesGraph} from "@/app/global-interfaces/nodes/ExtModules";
import {
  OperationModesMonitorPanelComponent
} from "@/app/components/node-monitor-panel/operation-modes-monitor-panel/operation-modes-card.component";

@Component({
  selector: 'app-test-site',
  imports: [
    OperationModesMonitorPanelComponent
  ],
  templateUrl: './test-site.component.html',
  styleUrl: './test-site.component.css',
  standalone: true
})
export class TestSiteComponent {


  protected testData: {
    modes: OperationModes;
    graph: OperationModesGraph
  } = {
    modes: {
      modes: {
        0: "Mode 0",
        1: "Mode 1",
        2: "Mode 2",
      },
      activeOperationModeIdx: 0,
    },
    graph: {
      graph: {
        0: {targetMode: 1, duration: 10},
        1: {targetMode: 2, duration: 20},
        2: {targetMode: 0, duration: 30},
      }
    }
  };

  constructor() {
    console.log("📡 [TestSiteComponent] Sending testData:", this.testData);
  }


}
