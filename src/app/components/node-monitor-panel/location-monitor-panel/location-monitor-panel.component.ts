import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {
  ReadonlyNodeMonitorPanelComponent
} from "@/app/components/node-monitor-panel/node-monitor-panel-component.directive";
import {LocationModule} from "@/app/global-interfaces/nodes/ExtModules";

@Component({
  selector: 'app-location-monitor-panel',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './location-monitor-panel.component.html',
  styleUrl: './location-monitor-panel.component.css'
})
export class LocationMonitorPanelComponent extends ReadonlyNodeMonitorPanelComponent<LocationModule> {

  getTitle(): string {
    return "location";
  }

  constructor() {
    super();
  }


  latitudeDMS: string = '';
  longitudeDMS: string = '';

  ngOnInit(): void {
    this.latitudeDMS = this.convertToDMS(this.data.latitude, 'latitude');
    this.longitudeDMS = this.convertToDMS(this.data.longitude, 'longitude');
  }

  convertToDMS(deg: number, type: string): string {
    const d = Math.floor(deg);
    const minFloat = (deg - d) * 60;
    const m = Math.floor(minFloat);
    const secFloat = (minFloat - m) * 60;
    const s = Math.round(secFloat);

    const direction = type === 'latitude'
      ? (deg >= 0 ? 'N' : 'S')
      : (deg >= 0 ? 'E' : 'W');

    return `${Math.abs(d)}°${Math.abs(m)}'${Math.abs(s)}" ${direction}`;
  }
}
