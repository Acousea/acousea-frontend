import {Component} from '@angular/core';
import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NodeContextService} from "@/app/services/node-context/node-context.service";

@Component({
  selector: 'app-node-settings-section',
  standalone: true,
  imports: [
    TranslateModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './node-settings-section.component.html',
  styleUrl: './node-settings-section.component.css'
})
export class NodeSettingsSectionComponent {

  selectedNode: NodeDevice | undefined;

  constructor(
    protected nodeContext: NodeContextService,
  ) {
    nodeContext.selectedNode$.subscribe(node => {
      console.warn('New Selected node', node)
      this.selectedNode = node;
    });
  }

}
