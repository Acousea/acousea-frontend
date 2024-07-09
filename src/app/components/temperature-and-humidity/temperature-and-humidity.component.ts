import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-temperature-and-humidity',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './temperature-and-humidity.component.html',
  styleUrl: './temperature-and-humidity.component.css'
})
export class TemperatureAndHumidityComponent {
  @Input() temperature: number = 0; // Celsius
  @Input() humidity: number = 0; // Percentage

  constructor() { }


  getTemperatureColor(): string {
    if (this.temperature > 30) {
      return '#ff5733'; // Hot - Red
    } else if (this.temperature > 20) {
      return '#ffa500'; // Warm - Orange
    } else if (this.temperature > 10) {
      return '#ffff00'; // Mild - Yellow
    } else {
      return '#1e90ff'; // Cold - Blue
    }
  }
}
