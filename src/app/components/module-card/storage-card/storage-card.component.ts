import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {IModuleCardComponent} from "@/app/components/module-card/Module.card.component";
import {StorageModule} from "@/app/global-interfaces/nodes/ExtModules";

@Component({
  selector: 'app-storage-card',
  standalone: true,
  imports: [
    DecimalPipe,
    TranslateModule
  ],
  templateUrl: './storage-card.component.html',
  styleUrl: './storage-card.component.css'
})
export class StorageCardComponent implements OnInit, IModuleCardComponent<StorageModule> {
  @Input() data: StorageModule = {available: 0, capacity: 0};
  readonly mutable: boolean = false;

  getTitle(): string {
    return "storage";
  }
  usedPercentage: number = 0;

  ngOnInit(): void {
    this.calcUsageBarWidth();
  }

  calcUsageBarWidth(): void {
    const totalMB = this.data.capacity;
    this.usedPercentage = ((this.data.capacity - this.data.available) / totalMB) * 100;
  }
}
