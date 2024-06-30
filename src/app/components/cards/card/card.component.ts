import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgClass,
    NgStyle
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() boldText!: string;
  @Input() lightText!: string;
  @Input() mainIcon!: string;
  @Input() openFunction: EventEmitter<void> | undefined;

  triggerOpenFunction() {
    // Lógica para abrir algo, por ejemplo, un modal o redirigir a otra página
    console.log('CardComponent::open() -> Open button clicked');
    if (this.openFunction) {
      this.openFunction.emit();
    }
  }
}



