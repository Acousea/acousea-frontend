import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as L from "leaflet";
import {Marker} from "leaflet";
import 'leaflet-arrowheads';
import {CurrentVectorsService} from "@/app/services/current-vectors-service/current-vectors.service";

import {NodeDevice} from "@/app/global-interfaces/nodes/NodeDevice";
import {
  DeviceConfigPopUpService
} from "@/app/services/pop-ups-services/device-config-popup-service/device-config-pop-up.service";
import {NodeDevicesService} from "@/app/services/node-devices-service/node-devices.service";


@Component({
  selector: 'app-map-geo',
  standalone: true,
  imports: [],
  templateUrl: './map-geo.component.html',
  styleUrls: ['./map-geo.component.css']
})
export class MapGeoComponent implements OnChanges, AfterViewInit {
  @Input() nodes: NodeDevice[] = []; // Recibe los nodos desde fuera
  map: any;
  private markers: { [key: string]: Marker } = {}; // Almacena los marcadores por ID
  private readonly LPGC_Coord = [28.1, -15.4];

  constructor(
    private currentVectorParser: CurrentVectorsService,
    private communicationSystemService: NodeDevicesService,
    protected deviceConfigPopUpService: DeviceConfigPopUpService
  ) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadNodeMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes'] && !changes['nodes'].firstChange) {
      this.updateNodeMarkers(); // Actualiza los nodos al detectar cambios
    }
  }

  initMap(): void {
    this.map = L.map('map')
      .setView([0, 0], 4)
      .setMaxBounds(L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)));

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Automatically resize when the map container changes size (avoids the need to manually call invalidateSize)
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      new ResizeObserver(() => this.map.invalidateSize()).observe(mapContainer);
      // setTimeout(() => {
      //   this.map.invalidateSize()
      // }, 100);
    }
  }

  loadNodeMarkers(): void {
    this.clearMarkers(); // Limpiar marcadores existentes antes de cargar nuevos

    // Añade marcadores para cada nodo
    this.nodes.forEach((node) => {
      const icon = L.icon({
        iconUrl: node.icon || 'https://cdn-icons-png.flaticon.com/512/0/14.png', // URL por defecto
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      if (!node.extModules.location) return; // Verifica que el módulo de localización esté presente

      const marker = L.marker([node.extModules.location.latitude, node.extModules.location.longitude], {icon})
        .addTo(this.map)

      marker.bindPopup(`${node.name}<br>Lat: ${node.extModules.location.latitude}, Lng: ${node.extModules.location.longitude}`)
        .on('mouseover', () => marker.openPopup()) // Mostrar popup en hover
        .on('mouseout', () => marker.closePopup())  // Ocultar popup al salir del hover
        .on('click', () => this.deviceConfigPopUpService.showNodePopup(node)) // Llama al servicio en click

      this.markers[node.id] = marker; // Asigna el marcador al nodo por su ID
    });
  }

  updateNodeMarkers(): void {
    this.clearMarkers(); // Limpia todos los marcadores existentes antes de actualizar
    this.loadNodeMarkers(); // Vuelve a cargar los marcadores con los nuevos datos de nodes
  }

  clearMarkers(): void {
    // Remueve cada marcador del mapa y limpia el objeto markers
    Object.values(this.markers).forEach(marker => this.map.removeLayer(marker));
    this.markers = {};
  }
}
