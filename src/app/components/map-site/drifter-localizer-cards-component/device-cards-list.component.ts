import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { SummaryCardComponent } from "../../cards/summary-card/summary-card.component";
import { DeviceConfigPopUpService } from "@/app/services/pop-ups-services/device-config-popup-service/device-config-pop-up.service";
import { NodeDevice } from "@/app/global-interfaces/nodes/NodeDevice";

@Component({
  selector: 'app-device-cards-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    SummaryCardComponent,
    NgIf
  ],
  templateUrl: './device-cards-list.component.html',
  styleUrls: ['./device-cards-list.component.css']
})
export class DeviceCardsListComponent {
  @Input() nodes: NodeDevice[] = []; // Lista de nodos recibidos
  @Input() selectedNode: NodeDevice | undefined = undefined; // Permite binding bidireccional con selectedNode
  @Output() selectedNodeChange = new EventEmitter<NodeDevice>(); // Emite el nodo seleccionado para binding

  dropdownVisible = false; // Controla la visibilidad del desplegable

  constructor(private deviceConfigPopUpService: DeviceConfigPopUpService) {}

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible; // Alterna la visibilidad del desplegable
  }

  selectNode(node: NodeDevice) {
    this.selectedNode = node; // Actualiza el nodo seleccionado localmente
    this.selectedNodeChange.emit(node); // Emite el nodo al componente padre para sincronizar el binding
    this.dropdownVisible = false; // Cierra el desplegable
  }

  openPopup(node: NodeDevice) {
    this.deviceConfigPopUpService.showNodePopup(node);
  }
}
