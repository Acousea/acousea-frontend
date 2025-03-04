import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-control-system-config',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './control-system-config.component.html',
  styleUrls: ['../node-config.component.css']
})
export class ControlSystemConfigComponent implements OnChanges {
  @Input() selectedNode: NodeDevice | undefined;
  @Output() selectedNodeChange = new EventEmitter<NodeDevice>();

  // loRaReportingArray: { key: OperationMode, value: number }[] = [];
  // iridiumReportingArray: { key: OperationMode, value: number }[] = [];

  ngOnChanges(): void {
    if (this.selectedNode) {
      // this.initializeReportingArrays();
      this.selectedNodeChange.emit(this.selectedNode);
    }
  }

  // initializeReportingArrays(): void {
  //   if (this.selectedNode?.extModules.loRaReporting?.reportingPeriods) {
  //     this.loRaReportingArray = Array.from(
  //       this.selectedNode.extModules.loRaReporting.reportingPeriods.entries()
  //     ).map(([key, value]) => ({key, value}));
  //   }
  //
  //   if (this.selectedNode?.extModules.iridiumReporting?.reportingPeriods) {
  //     this.iridiumReportingArray = Array.from(
  //       this.selectedNode.extModules.iridiumReporting.reportingPeriods.entries()
  //     ).map(([key, value]) => ({key, value}));
  //   }
  // }

  // updateLoRaReportingPeriod(operationMode: OperationMode, newValue: number): void {
  //   if (this.selectedNode?.extModules?.loRaReporting) {
  //     this.selectedNode.extModules.loRaReporting.reportingPeriods.set(operationMode, newValue);
  //   }
  // }
  //
  // updateIridiumReportingPeriod(operationMode: OperationMode, newValue: number): void {
  //   if (this.selectedNode?.extModules?.iridiumReporting) {
  //     this.selectedNode.extModules.iridiumReporting.reportingPeriods.set(operationMode, newValue);
  //   }
  // }
}
