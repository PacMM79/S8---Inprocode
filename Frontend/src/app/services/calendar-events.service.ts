import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventInput } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventInput[]> {
    return this.http.get<EventInput[]>(this.apiUrl);
  }

  addEvent(event: EventInput): Observable<EventInput> {
    return this.http.post<EventInput>(this.apiUrl, event);
  }

  updateEvent(id: string, event: EventInput): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
