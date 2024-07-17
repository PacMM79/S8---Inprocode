import { Component, OnInit, Inject } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
bookings: any[] = [];
bookingId: any;
sortedByDateAsc: boolean = false;

  constructor(@Inject(BookingsService) private dataService: BookingsService) { }

  ngOnInit() {
    this.fetchBookings();
    this.dataService.getDatos().pipe(
      catchError(error => {
        console.error('Error fetching bookings:', error);
        return of([]);
      })
    ).subscribe(data => {
      this.bookings = data.map(dato => ({
        ...dato,
        formattedDate: this.formatFecha(dato.date),
        formattedTime: this.formatHora(dato.time)
      }));
    });
  }

  fetchBookings() {
    this.dataService.getDatos().pipe(
      catchError(error => {
        console.error('Error fetching bookings:', error);
        return of([]);
      })
    ).subscribe(data => {
      this.bookings = data.map(dato => ({
        ...dato,
        formattedDate: this.formatFecha(dato.date),
        formattedTime: this.formatHora(dato.time),
      }));
      this.sortBookingsByDate();
    });
  }

  sortBookingsByDate() {
    if (this.sortedByDateAsc) {
      this.bookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      this.bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  toggleSortByDate() {
    this.sortedByDateAsc = !this.sortedByDateAsc;
    this.sortBookingsByDate();
  }

  formatFecha(fecha: string): string {
    const daysOfWeek = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const monthsOfYear = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const date = new Date(fecha);
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    const dia = ('0' + date.getDate()).slice(-2);
    const año = date.getFullYear();
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];

    return `${dayOfWeek}, ${dia} de ${month} de ${año}`;
  }

  formatHora(hora: string): string {
    const [hours, minutes] = hora.split(':');
    return `${hours}:${minutes}`;
  }

  convertToCSV(data: any[]) {
    const headers = ['Nombre', 'Email', 'Teléfono', 'Fecha', 'Hora', 'Servicio', 'Precio', 'Notas'];
    const csvRows = [headers.join(',')];
  
    for (const booking of data) {
      const row = [
        booking.name,
        booking.email,
        booking.tel,
        booking.formattedDate,
        booking.formattedTime,
        booking.service,
        booking.price,
        booking.notes || '' // Agregar una cadena vacía si no hay notas
      ].join(',');
      csvRows.push(row);
    }
  
    return csvRows.join('\n');
  }

  downloadCSV() {
    const csvData = this.convertToCSV(this.bookings);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'reservas.csv');
    a.click();
  }

}
