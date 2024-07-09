import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TooltipComponent} from '../../../components/tooltip/tooltip.component';

@Component({
  selector: 'app-control-system-config',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TooltipComponent
  ],
  templateUrl: './control-system-config.component.html',
  styleUrl: './control-system-config.component.css'
})
export class ControlSystemConfigComponent {

}
