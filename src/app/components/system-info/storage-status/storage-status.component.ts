import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-storage-status',
  standalone: true,
  imports: [
    DecimalPipe,
    TranslateModule
  ],
  templateUrl: './storage-status.component.html',
  styleUrl: './storage-status.component.css'
})
export class StorageStatusComponent implements OnInit {
  free: number = 0;
  @Input() used: number = 0; // MB
  @Input() total: number = 0; // GB

  usedPercentage: number = 0;

  ngOnInit(): void {
    this.calcUsageBarWidth();
  }

  calcUsageBarWidth(): void {
    const totalMB = this.total;
    this.free = this.total - this.used;
    this.usedPercentage = (this.used / totalMB) * 100;
  }
}
