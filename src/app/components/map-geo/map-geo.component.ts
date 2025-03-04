import {Component, OnDestroy, OnInit} from '@angular/core';
import {Marker} from "leaflet";
import * as L from 'leaflet';
import 'leaflet-arrowheads';
import {
  CurrentVectorsService,
  SingleLatLonUVValues
} from "../../services/current-vectors-service/current-vectors.service";
import {
  CommunicationSystemDeviceLocation,
  CommunicationSystemService
} from "../../services/communication-system-service/communication-system.service";


@Component({
    selector: 'app-map-geo',
    imports: [],
    templateUrl: './map-geo.component.html',
    styleUrls: [
        './map-geo.component.css'
    ] // Add this line to the file
})
export class MapGeoComponent implements OnInit, OnDestroy {
  map: any;
  private drifterIcon: any;
  private localizerIcon: any;
  private drifterMarker!: Marker<any>;
  private localizerMarker!: Marker<any>;
  private latestCurrentData: SingleLatLonUVValues | undefined;
  private readonly LPGC_Coord = [28.1, -15.4];
  private intervalId: any; // Variable para almacenar el ID del setInterval

  constructor(private currentVectorParser: CurrentVectorsService,
              private communicationSystemService: CommunicationSystemService
              ){
    this.drifterIcon = L.icon({
      iconUrl: '/assets/icons/buoy.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    this.localizerIcon = L.icon({
      iconUrl: '/assets/icons/compass.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
  }

  ngOnInit(): void {
    this.initMap();
    this.loadInitialLocations();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Limpiar el intervalo de simulación
  }

  initMap(): void {
    this.map = L.map('map',
      {
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)) // Limita los límites del mapa
      })
      .setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }


  loadInitialLocations(): void {
    this.communicationSystemService.getLocalizerLocation().subscribe({
      next: localizerLocation => {
        if (localizerLocation) {
          this.addOceanLocalizer(localizerLocation);
        }
      },
      error: error => {
        console.error('Error fetching localizer location:', error);
      }
    });

    this.communicationSystemService.getDrifterLocation().subscribe({
      next: drifterLocation => {
        if (drifterLocation) {
          this.addOceanDrifter(drifterLocation);
          // this.simulateDrifterMovement(drifterLocation);
        }
      },
      error: error => {
        console.error('Error fetching drifter location:', error);
      }
    });
  }

  addOceanDrifter(location: CommunicationSystemDeviceLocation): void {
    const drifterLocation: L.LatLngExpression = [location.latitude, location.longitude];
    this.drifterMarker = L.marker(drifterLocation, { icon: this.drifterIcon }).addTo(this.map);
  }

  addOceanLocalizer(location: CommunicationSystemDeviceLocation): void {
    const localizerLocation: L.LatLngExpression = [location.latitude, location.longitude];
    this.localizerMarker = L.marker(localizerLocation, { icon: this.localizerIcon }).addTo(this.map);
  }

  drawCurrentVector(currentData: SingleLatLonUVValues): void {
    const scaleFactor = 10; // Factor de escala para los vectores de velocidad

    // Calcular el punto final del vector u_velocity (este-oeste)
    const endPointU: L.LatLngExpression = [
      this.drifterMarker.getLatLng().lat + currentData.u! * scaleFactor,
      this.drifterMarker.getLatLng().lng
    ];

    // Calcular el punto final del vector v_velocity (norte-sur)
    const endPointV: L.LatLngExpression = [
      this.drifterMarker.getLatLng().lat,
      this.drifterMarker.getLatLng().lng + currentData.v! * scaleFactor
    ];

    // Dibujar el vector u_velocity (este-oeste)
    const uVector = L.polyline(
      [this.drifterMarker.getLatLng(), endPointU], { color: 'blue' })
      .arrowheads({size: '10px', frequency: 'endonly'})
      .addTo(this.map);

    // Dibujar el vector v_velocity (norte-sur)
    const vVector = L.polyline(
      [this.drifterMarker.getLatLng(), endPointV], { color: 'red' })
      .arrowheads({size: '10px', frequency: 'endonly'})
      .addTo(this.map);

    console.log("Drawing vectors u and v...");
    // Opción para eliminar los vectores después de un tiempo (opcional)
    setTimeout(() => {
      this.map.removeLayer(uVector);
      this.map.removeLayer(vVector);

    }, 5000);
  }


  simulateDrifterMovement(initialLocation: CommunicationSystemDeviceLocation): void {
    const drifterLocation: L.LatLngExpression = [initialLocation.latitude, initialLocation.longitude];

    this.intervalId = setInterval(async () => {
      drifterLocation[0] += (Math.random() - 0.5);
      drifterLocation[1] += (Math.random() - 0.5);

      this.drifterMarker.setLatLng(drifterLocation);

      this.latestCurrentData = await this.currentVectorParser.getOceanCurrents(drifterLocation[0], drifterLocation[1]);

      if (this.latestCurrentData) {
        this.drawCurrentVector(this.latestCurrentData);
      }
    }, 5000);
  }
}

