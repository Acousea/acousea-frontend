import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-update-info-button',
  standalone: true,
  imports: [
    NgClass,
    TranslateModule
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
