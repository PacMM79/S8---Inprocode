import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private apiUrl = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) { }

  getDatos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBookingById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateBooking(id: string, bookingData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bookingData);
  }

  addBooking(bookingData: any): Observable<any> {
    return this.http.post(this.apiUrl, bookingData);
  }

  deleteBooking(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

