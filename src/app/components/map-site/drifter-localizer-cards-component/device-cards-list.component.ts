import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {
  DeviceConfigPopUpService
} from "@/app/services/pop-ups/device-config-popup-service/device-config-pop-up.service";
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {DeviceCardComponent} from "@/app/components/cards/device-card/device-card.component";
import {NodeContextService} from "@/app/services/node-context/node-context.service";

@Component({
  selector: 'app-device-cards-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    DeviceCardComponent,
    AsyncPipe
  ],
  templateUrl: './device-cards-list.component.html',
  styleUrls: ['./device-cards-list.component.css']
})
export class DeviceCardsListComponent {
  @Input() nodes: NodeDevice[] = [];
  selectedNode$ = this.nodeContext.selectedNode$;
  dropdownVisible = false;

  constructor(
    private deviceConfigPopUpService: DeviceConfigPopUpService,
    protected nodeContext: NodeContextService
  ) {
  }

  toggleDropdown() {
    console.warn("Toggle dropdown -> showing nodes: " + this.nodes);
    this.dropdownVisible = !this.dropdownVisible;
  }

  selectNode(node: NodeDevice) {
    this.nodeContext.setSelectedNode(node);
    this.dropdownVisible = false;
  }

}
