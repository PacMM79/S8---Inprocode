import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api/datos';

  constructor(private http: HttpClient) { }

  getDatos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
