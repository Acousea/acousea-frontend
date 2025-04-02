import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import {NodeContextService} from "@/app/services/node-context/node-context.service";

@Component({
  selector: 'app-apply-discard-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apply-discard-popup.component.html',
  styleUrl: './apply-discard-popup.component.css',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ApplyDiscardPopupComponent {
  visible = false;
  packetSize: number = 0;

  @Output() apply = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();


  constructor(private nodeContext: NodeContextService) {
    this.nodeContext.selectedNode$.subscribe((node) => {

    });
  }

  get creditCount(): number | null {
    return this.packetSize != null ? Math.ceil(this.packetSize / 50) : null;
  }
}
