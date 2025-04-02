import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {
  ReadonlyNodeMonitorPanelComponent
} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";
import {StorageModule} from "@/app/global-interfaces/nodes/ExtModules";

@Component({
  selector: 'app-storage-monitor-panel',
  standalone: true,
  imports: [
    DecimalPipe,
    TranslateModule
  ],
  templateUrl: './storage-monitor-panel.component.html',
  styleUrl: './storage-monitor-panel.component.css'
})
export class StorageMonitorPanelComponent extends ReadonlyNodeMonitorPanelComponent<StorageModule> implements OnInit {

  getTitle(): string {
    return "storage";
  }

  usedPercentage: number = 0;


  constructor() {
    super();
  }

  ngOnInit(): void {
    this.calcUsageBarWidth();
  }

  calcUsageBarWidth(): void {
    const totalMB = this.data.capacity;
    this.usedPercentage = ((this.data.capacity - this.data.available) / totalMB) * 100;
  }
}
