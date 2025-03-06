import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {IModuleCardComponent} from "@/app/components/module-card/Module.card.component";
import {AmbientModule} from "@/app/global-interfaces/nodes/ExtModules";

@Component({
  selector: 'app-temperature-and-humidity',
  standalone: true,
  imports: [
    NgStyle,
    TranslateModule
  ],
  templateUrl: './ambient.component.html',
  styleUrl: './ambient.component.css'
})
export class AmbientComponent implements IModuleCardComponent<AmbientModule> {
  @Input() data: AmbientModule = {temperature: 0, humidity: 0};
  readonly mutable: boolean = false;

  getTitle(): string {
    return "ambient"
  }

  getTemperatureColor(): string {
    if (this.data.temperature > 30) {
      return '#ff5733'; // Hot - Red
    } else if (this.data.temperature > 20) {
      return '#ffa500'; // Warm - Orange
    } else if (this.data.temperature > 10) {
      return '#ffff00'; // Mild - Yellow
    } else {
      return '#1e90ff'; // Cold - Blue
    }
  }
}
