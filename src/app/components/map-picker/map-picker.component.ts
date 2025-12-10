import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map-picker',
  templateUrl: './map-picker.component.html',
  styleUrls: ['./map-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf]
})
export class MapPickerComponent implements OnInit {

  @Output() selected = new EventEmitter<{
    lat: number,
    lng: number,
    street?: string,
    city?: string
  }>();

  @Output() cancel = new EventEmitter<void>();

  map!: L.Map;
  marker!: L.Marker;

  selectedPoint: { lat: number, lng: number } | null = null;

  street = "";
  city = "";
  selectedAddress = "";

  searchQuery = "";
  suggestions: any[] = [];
  searchTimeout: any;

  ngOnInit(): void {

    // Inicialización básica
    this.map = L.map('map').setView([4.65, -74.05], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // LOCALIZAR USUARIO
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          this.map.setView([latitude, longitude], 16);
        },
        () => console.warn("No se pudo obtener ubicación")
      );
    }

    // CLICK EN MAPA
    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.updateMarker(lat, lng);
      this.reverseGeocode(lat, lng);
    });
  }

  updateMarker(lat: number, lng: number) {
    this.selectedPoint = { lat, lng };

    if (this.marker) this.map.removeLayer(this.marker);

    this.marker = L.marker([lat, lng]).addTo(this.map);
    this.map.setView([lat, lng], 16);
  }

  reverseGeocode(lat: number, lng: number) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
      .then(res => res.json())
      .then(data => {
        this.street = data.address.road || data.address.neighbourhood || "";
        this.city = data.address.city || data.address.town || data.address.village || "";

        this.selectedAddress = `${this.street}, ${this.city}`;
      });
  }

  onSearchChange() {
    clearTimeout(this.searchTimeout);

    if (!this.searchQuery.trim()) {
      this.suggestions = [];
      return;
    }

    this.searchTimeout = setTimeout(() => {
      this.searchAddress(this.searchQuery);
    }, 300);
  }

  searchAddress(query: string) {
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=jsonv2&addressdetails=1&limit=5`)
      .then(res => res.json())
      .then(data => this.suggestions = data);
  }

  selectSuggestion(s: any) {
    const lat = parseFloat(s.lat);
    const lng = parseFloat(s.lon);

    this.updateMarker(lat, lng);

    this.street = s.address.road || "";
    this.city = s.address.city || s.address.town || s.address.village || "";
    this.selectedAddress = `${this.street}, ${this.city}`;

    this.suggestions = [];
    this.searchQuery = s.display_name;
  }

  savePoint() {
    if (!this.selectedPoint) return;

    this.selected.emit({
      lat: this.selectedPoint.lat,
      lng: this.selectedPoint.lng,
      street: this.street,
      city: this.city
    });
  }
}
