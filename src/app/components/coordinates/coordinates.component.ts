import {Component, Input} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-coordinates',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './coordinates.component.html',
  styleUrl: './coordinates.component.css'
})
export class CoordinatesComponent {
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;

  latitudeDMS: string = '';
  longitudeDMS: string = '';

  ngOnInit(): void {
    this.latitudeDMS = this.convertToDMS(this.latitude, 'latitude');
    this.longitudeDMS = this.convertToDMS(this.longitude, 'longitude');
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
