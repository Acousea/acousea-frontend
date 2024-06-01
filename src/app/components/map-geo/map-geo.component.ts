import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Marker} from "leaflet";
import * as L from 'leaflet';
import 'leaflet-arrowheads';
import {CurrentVectorParser, SingleLatLonUVValues} from "./current-vector-parser/current-vector-parser";

@Component({
  selector: 'app-map-geo',
  standalone: true,
  imports: [],
  templateUrl: './map-geo.component.html',
  styleUrls: [
    './map-geo.component.css'] // Add this line to the file
})
export class MapGeoComponent implements OnInit, OnDestroy {
  map: any;
  private drifterIcon: any;
  private drifterMarker!: Marker<any>;
  private currentParser: CurrentVectorParser;
  private latestCurrentData: SingleLatLonUVValues | undefined;
  private readonly LPGC_Coord = [28.1, -15.4];
  private intervalId: any; // Variable para almacenar el ID del setInterval

  constructor(private httpClient: HttpClient) {
    this.drifterIcon = L.icon({
      iconUrl: '/assets/drifter-icon.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    this.currentParser = new CurrentVectorParser(httpClient);
  }

  ngOnInit(): void {
    this.initMap();
    this.addOceanDrifter();
    this.simulateDrifterMovement();
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

  addOceanDrifter(): void {
    // Aquí puedes agregar un marcador para representar la ubicación del derivador oceánico
    const drifterLocation: L.LatLngExpression = [
      0, 0
    ]; // Coordenadas del derivador oceánico
    this.drifterMarker = L.marker(drifterLocation, {icon: this.drifterIcon}).addTo(this.map);
  }

  simulateDrifterMovement(): void {
    // Simula el movimiento del derivador oceánico
    const drifterLocation: L.LatLngExpression = [this.LPGC_Coord[0], this.LPGC_Coord[1]]; // Coordenadas del derivador oceánico

    this.intervalId = setInterval(async () => {
      // Randomly move the drifter
      drifterLocation[0] += (Math.random() - 0.5);
      drifterLocation[1] += (Math.random() - 0.5);

      console.log("Moving to new location... = ", drifterLocation)
      this.drifterMarker.setLatLng(drifterLocation);

      // Obtener y guardar las corrientes oceánicas en latestCurrentData
      this.latestCurrentData = await this.currentParser.getOceanCurrents(drifterLocation[0], drifterLocation[1]);

      // Dibujar los vectores de corriente
      if (this.latestCurrentData) {
        this.drawCurrentVector(this.latestCurrentData);
      }
    }, 5000);
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
}

