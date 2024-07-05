import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-update-info-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './update-info-button.component.html',
  styleUrl: './update-info-button.component.css'
})
export class UpdateInfoButtonComponent {
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Output() buttonClick = new EventEmitter<void>();

  executeFunction() {
    this.buttonClick.emit();
  }
}
