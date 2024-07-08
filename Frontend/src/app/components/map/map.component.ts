import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  zoom = 13;
  center: google.maps.LatLngLiteral = {
    lat: 41.390205,
    lng: 2.154007,
  };
  options: google.maps.MapOptions = {
    gestureHandling: 'cooperative',
  };
  markers: any[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getLocations().subscribe({
      next: (locations) => {
        this.markers = locations;
      },
      error: (err) => {
        console.error('Error finding locations:', err);
      },
    });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      const newMarker = {
        position: event.latLng.toJSON(),
        title: 'New Marker',
        id: null,
      };
      this.locationService.saveLocation(newMarker).subscribe((response) => {
        console.log('Location saved:', response);
        newMarker.id = response._id;
        this.markers.push(newMarker);
      });
    }
  }

  removeMarker(markerIndex: number) {
    const marker = this.markers[markerIndex];
    if (marker.id || marker._id) {
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
