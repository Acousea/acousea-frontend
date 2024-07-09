import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-storage-status',
  standalone: true,
  imports: [],
  templateUrl: './storage-status.component.html',
  styleUrl: './storage-status.component.css'
})
export class StorageStatusComponent implements OnInit {
  used: number = 0;
  @Input() free: number = 0; // MB
  @Input() total: number = 0; // GB

  usedPercentage: number = 0;

  ngOnInit(): void {
    this.calcUsageBarWidth();
  }

  calcUsageBarWidth(): void {
    const totalMB = this.total;
    this.used = this.total - this.free;
    this.usedPercentage = (this.used / totalMB) * 100;
  }
}
