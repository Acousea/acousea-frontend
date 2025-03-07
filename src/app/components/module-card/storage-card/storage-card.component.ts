import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ModuleCardComponent} from "@/app/components/module-card/Module.card.component";
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
export class StorageCardComponent extends ModuleCardComponent<StorageModule> implements OnInit {

  constructor() {
    super();
  }

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
