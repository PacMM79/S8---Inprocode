import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marker } from '../interfaces/map-markers';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:3000/api/markers';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<Marker[]> {
    return this.http.get<Marker[]>(this.apiUrl);
  }

  saveLocation(location: Marker): Observable<Marker> {
    return this.http.post<Marker>(this.apiUrl, location);
  }

  deleteLocation(location: Marker): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${location.id}`);
  }
}
