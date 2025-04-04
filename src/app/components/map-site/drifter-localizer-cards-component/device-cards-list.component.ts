import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {DeviceCardComponent} from "@/app/components/cards/device-card/device-card.component";
import {WarningComponent} from "@/app/components/shared/warning-component/warning.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-device-cards-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    DeviceCardComponent,
    WarningComponent,
    TranslateModule
  ],
  templateUrl: './device-cards-list.component.html',
  styleUrls: ['./device-cards-list.component.css']
})
export class DeviceCardsListComponent {
  @Input() nodes: NodeDevice[] = [];
  @Input() selectedNode: NodeDevice | undefined = undefined;
  @Output() nodeSelected = new EventEmitter<NodeDevice>();

  dropdownVisible = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  selectNode(node: NodeDevice) {
    this.nodeSelected.emit(node);
    this.dropdownVisible = false;
  }
}
