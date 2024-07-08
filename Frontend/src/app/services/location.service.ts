import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'http://localhost:3000/api/locations';

  constructor(private http: HttpClient) {}

  saveLocation(location: any): Observable<any> {
    return this.http.post(this.apiUrl, location);
  }

  deleteLocation(location: any): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${location.id || location._id}`;
    return this.http.delete(deleteUrl);
  }

  getLocations(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
