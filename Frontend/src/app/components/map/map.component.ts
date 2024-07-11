import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LocationService } from '../../services/location.service';
import { Marker } from '../../interfaces/map-markers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  zoom = 11;
  center: google.maps.LatLngLiteral = {
    lat: 41.390390,
    lng: 2.154154,
  };
  options: google.maps.MapOptions = {
    gestureHandling: 'cooperative',
  };
  markers: Marker[] = [];

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
      },
      error: (err) => {
        console.error('Error finding locations:', err);
      },
    });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      const newMarker: Marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        title: 'New Marker',
        description: 'Description for new marker',
      };
      this.locationService.saveLocation(newMarker).subscribe((response) => {
        console.log('Location saved:', response);
        newMarker.id = response.id;
        this.markers.push(newMarker);
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
    }
  }
}
