import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { WebSocketService } from '../../services/web-socket-service.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  private map!: L.Map;
  private marker!: L.Marker;
  private route: L.LatLng[] = [];
  private polyline!: L.Polyline;

  private motoIcon = L.icon({
    iconUrl: 'assets/icons/moto.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
  });

  constructor(private ws: WebSocketService) {}

  ngOnInit(): void {
    this.initMap();

    const plate = "ABC123"; // placa a seguir

    this.ws.setNameEvent(plate);

    this.ws.callback.subscribe((coord: any) => {
      console.log("Coordenada recibida:", coord);
      this.updateMarker(coord.lat, coord.lng);
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([5.07, -75.52], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Posición inicial temporal
    this.marker = L.marker([5.07, -75.52], { icon: this.motoIcon }).addTo(this.map);

    this.polyline = L.polyline([], { color: 'blue' }).addTo(this.map);
  }

  private updateMarker(lat: number, lng: number): void {
    const newPos = L.latLng(lat, lng);

    // Actualiza marcador
    this.marker.setLatLng(newPos);

    // Guarda historial
    this.route.push(newPos);
    this.polyline.setLatLngs(this.route);

    // Centra mapa
    this.map.panTo(newPos);
  }
}
