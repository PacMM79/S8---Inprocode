import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { LocationService } from '../../services/location.service';
import { Marker } from '../../interfaces/map-markers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  zoom = 14;
  center: google.maps.LatLngLiteral = {
    lat: 41.403275452591224,
    lng: 2.179069984436053,
  };
  options: google.maps.MapOptions = {
    gestureHandling: 'cooperative',
  };
  markers: Marker[] = [];
  polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };
  polyline: google.maps.Polyline | null = null;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getLocations().subscribe({
      next: (locations) => {
        this.markers = locations.map(location => ({
          id: location.id,
          lat: location.lat,
          lng: location.lng,
          title: location.title,
          description: location.description,
        }));
        this.updatePolyline();
      },
      error: (err) => {
        console.error('Error finding locations:', err);
      },
    });
  }

  ngAfterViewInit() {
    this.initPolyline();
  }

  initPolyline() {
    if (this.map?.googleMap) {
      this.polyline = new google.maps.Polyline(this.polylineOptions);
      this.polyline.setMap(this.map.googleMap);
      this.updatePolyline();
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      const newMarker: Marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        title: 'Marcador',
        description: 'Punto de interés',
      };
      this.locationService.saveLocation(newMarker).subscribe((response) => {
        console.log('Location saved:', response);
        newMarker.id = response.id;
        this.markers.push(newMarker);
        this.updatePolyline();
      });
    }
  }

  removeMarker(markerIndex: number) {
    const marker = this.markers[markerIndex];
    if (marker.id) {
      this.locationService.deleteLocation(marker).subscribe({
        next: () => {
          console.log('Location deleted');
          this.markers.splice(markerIndex, 1);
          this.updatePolyline();
        },
        error: (err) => {
          console.error('Error deleting location:', err);
        },
      });
    } else {
      console.warn(
        'Marker does not have an ID and cannot be deleted from the backend'
      );
      this.markers.splice(markerIndex, 1);
      this.updatePolyline();
    }
  }

  updatePolyline() {
    if (this.polyline && this.map?.googleMap) {
      const path = this.markers.map(marker => ({ lat: marker.lat, lng: marker.lng }));
      this.polyline.setOptions({ path: path });
      this.polyline.setMap(this.map.googleMap);
    }
  }
}
