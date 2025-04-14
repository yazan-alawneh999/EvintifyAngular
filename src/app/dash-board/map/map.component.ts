import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet.locatecontrol';
import { MapeventService } from 'src/app/services/mapevent.service';

declare module 'leaflet' {
  namespace control {
    function locate(options?: any): LocateControl;
  }
  interface LocateControl extends Control {
    start(): void;
    stop(): void;
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map!: L.Map;
  markers: L.Marker[] = [];
  events: any[] = [];
  filteredEvents: any[] = [];
  selectedType = '';
  selectedStatus = '';

  constructor(private mapEventService: MapeventService) {
    this.mapEventService.getMapEvents().subscribe(
      (data: any) => {
        this.events = data;
        this.filteredEvents = [...this.events];
        this.loadMarkers();
      },
      (error) => console.error('Error fetching map events:', error)
    );
  }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const street = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenStreetMap contributors',
      }
    );

    const satellite = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenTopoMap contributors',
      }
    );

    this.map = L.map('map', {
      center: [32.0853, 36.094],
      zoom: 12,
      layers: [street],
    });

    const baseLayers = {
      'Street View': street,
      'Satellite View': satellite,
    };

    L.control.layers(baseLayers).addTo(this.map);
    L.control.scale().addTo(this.map);

    // ✅ إضافة مربع البحث
    // @ts-ignore
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
    }).addTo(this.map);

    // ✅ زر لتحديد الموقع الحالي
    const locateControl = L.control.locate({ position: 'topleft' });
    locateControl.onAdd = () => {
      const div = L.DomUtil.create(
        'div',
        'leaflet-bar leaflet-control leaflet-control-custom'
      );
      div.innerHTML = '📍';
      div.style.width = '34px';
      div.style.height = '34px';
      div.style.lineHeight = '34px';
      div.style.textAlign = 'center';
      div.style.cursor = 'pointer';
      div.title = 'Show my location';
      div.onclick = () => {
        this.map.locate({ setView: true, maxZoom: 16 });
      };
      return div;
    };
    locateControl.addTo(this.map);
  }

  loadMarkers(): void {
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    const bounds = L.latLngBounds([]);

    const eventIcon = L.icon({
      iconUrl: '../../../assets/AdminDash/img/event-list.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -30],
    });

    this.filteredEvents.forEach((event) => {
      const latlng = L.latLng(
        event.location.latitude,
        event.location.longitude
      );

      const marker = L.marker(latlng, { icon: eventIcon }).addTo(this.map)
        .bindPopup(`
        <div style="min-width: 220px;">
          <img src="../../../assets/AdminDash/img/evetnd.jpeg" alt="${event.eventName}" style="width: 100%; height: auto; border-radius: 6px; margin-bottom: 5px;" />
          <h4 style="margin: 0;">${event.eventName}</h4>
          <p><strong>Type:</strong> ${event.eventType}</p>
          <p><strong>Status:</strong> ${event.eventStatus}</p>
          <p><strong>Location:</strong> ${event.location.address}</p>
        </div>
      `);

      this.markers.push(marker);
      bounds.extend(latlng);
    });

    if (this.filteredEvents.length > 0) {
      this.map.fitBounds(bounds.pad(0.2));
    }
  }

  filterEvents(): void {
    this.filteredEvents = this.events.filter((event) => {
      return (
        (this.selectedType === '' || event.eventType === this.selectedType) &&
        (this.selectedStatus === '' ||
          event.eventStatus === this.selectedStatus)
      );
    });
    this.loadMarkers();
  }
}
