import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-device-info-site',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './device-info-site.component.html',
  styleUrl: './device-info-site.component.css'
})
export class DeviceInfoSiteComponent {
  // Variables para almacenar el estado del dispositivo
  unitStatus: string = 'Ready';
  battery: string = '99% (Not Charging)';
  unitTime: string = 'Fri, 01 Jan 2010 23:44:55 UTC';
  timeSync: string = 'No PPS';
  temperature: string = '29.6°C';
  humidity: string = '31.7%';

  // Variables para el estado de la grabación
  recordWAV: string = 'Off (50 kHz)';
  recordFFT: string = 'Off (200 kHz)';

  // Variables para el estado de eventos
  eventStatus: string[] = [
    'No Signal, Event Inactive',
    'Signal Present, Event Inactive',
    'Signal Present, Event Active',
    'No Signal, Event Active'
  ];

  // Variables para epoch y tilt
  epochs: number[] = [1, 2, 3, 4, 5];
  tilt: string = ''; // Agregar datos si están disponibles

  // Variables para información del dispositivo
  firmwareRelease: string = '40.0';
  hardwareRelease: string = '4';
  ipAddress: string = '192.168.10.150';
  macAddress: string = '00:08:EE:40:80:28';
  hydrophoneSensitivity: string = '-177.2 dBV re µPa';
  memoryCapacity: string = '128 GB';

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes inicializar datos si es necesario
  }
}
