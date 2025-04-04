import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';
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
        style({ transform: 'translate(-50%, -100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translate(-50%, 0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translate(-50%, -100%)', opacity: 0 }))
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
    this.nodeContext.observeChanges().subscribe((changes) => {
      // If there are no changes, hide the popup
      if (!changes) {
        console.warn("No changes detected, hiding popup");
        this.visible = false;
        return;
      }
      // If there are changes, show the popup
      console.warn("Changes detected, showing popup");
      this.visible = true;

    });


  }

  get creditCount(): number | null {
    return this.packetSize != null ? Math.ceil(this.packetSize / 50) : null;
  }
}
