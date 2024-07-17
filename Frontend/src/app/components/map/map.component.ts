import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { LocationService } from '../../services/map-locations.service';
import { Marker } from '../../interfaces/map-markers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
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
  filteredMarkers: Marker[] = [];
  polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#9119B3',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };
  polyline: google.maps.Polyline | null = null;
  selectedCategory: string | null = null;
  categories: { [key: string]: { icon: string; buttonClass: string; iconliClass: string } } = {
    Restaurante: { icon: 'assets/google-icons/red-dot.png', buttonClass: 'btn-outline-danger', iconliClass: 'bi bi-shop' },
    Parque: { icon: 'assets/google-icons/green-dot.png', buttonClass: 'btn-outline-success', iconliClass: 'bi bi-tree' },
    Museo: { icon: 'assets/google-icons/blue-dot.png', buttonClass: 'btn-outline-info', iconliClass: 'bi bi-postage-heart' },
    Tienda: { icon: 'assets/google-icons/yellow-dot.png', buttonClass: 'btn-outline-warning', iconliClass: 'bi bi-bag-heart' },
  };

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
          category: location.category,
          icon: this.categories[location.category]?.icon || 'assets/google-icons/red-dot.png'
        }));
        this.filterMarkers();
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
    if (event.latLng != null && this.selectedCategory != null) {
      const newMarker: Marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        title: `Marcador ${this.selectedCategory}`,
        description: `Descripción para ${this.selectedCategory}`,
        category: this.selectedCategory,
        icon: this.categories[this.selectedCategory]?.icon || 'assets/google-icons/red-dot.png'
      };
      this.locationService.saveLocation(newMarker).subscribe((response) => {
        console.log('Location saved:', response);
        newMarker.id = response.id;
        this.markers.push(newMarker);
        this.filterMarkers();
        this.updatePolyline();
      });
    } else {
      console.warn('No se puede agregar un marcador sin seleccionar una categoría.');
    }
  }

  removeMarker(markerIndex: number) {
    const marker = this.filteredMarkers[markerIndex];
    if (marker.id) {
      this.locationService.deleteLocation(marker).subscribe({
        next: () => {
          console.log('Location deleted');
          this.markers = this.markers.filter(m => m.id !== marker.id);
          this.filterMarkers();
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
      this.filteredMarkers.splice(markerIndex, 1);
      this.updatePolyline();
    }
  }

  updatePolyline() {
    if (this.polyline && this.map?.googleMap) {
      const path = this.filteredMarkers.map(marker => ({ lat: marker.lat, lng: marker.lng }));
      this.polyline.setOptions({ path: path });
      this.polyline.setMap(this.map.googleMap);
    }
  }

  selectCategory(category: string | null) {
    this.selectedCategory = category;
    this.filterMarkers();
    this.updatePolyline();
  }

  filterMarkers() {
    this.filteredMarkers = this.selectedCategory === null 
      ? this.markers 
      : this.markers.filter(marker => marker.category === this.selectedCategory);
  }

  getButtonClass(category: string | null): string {
    if (category === null) {
      return this.selectedCategory === null ? 'btn-secondary active' : 'btn-secondary';
    }
    return category === this.selectedCategory ? this.categories[category].buttonClass + ' active' : this.categories[category].buttonClass;
  }

  geticonliClass(category: string): string {
      return this.categories[category].iconliClass;
  }

  getCategoryCount(category: string): number {
    return this.markers.filter(marker => marker.category === category).length;
  }

  getCategoryKeys() {
    return Object.keys(this.categories);
  }
}
