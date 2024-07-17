import { Component, OnInit, Inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingsService } from '../../services/bookings.service';
import { Booking } from '../../interfaces/bookings';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-edit-booking',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-booking.component.html',
  styleUrls: ['./add-edit-booking.component.scss']
})
export class AddEditBookingComponent implements OnInit {
  form: FormGroup;
  bookingId: string | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(BookingsService) private dataService: BookingsService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      service: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id');
    if (this.bookingId) {
      this.dataService.getBookingById(this.bookingId).pipe(
        catchError(error => {
          this.error = 'Error fetching booking data';
          this.isLoading = false;
          return of(null);
        })
      ).subscribe(data => {
        if (data) {
          const formattedDate = this.formatFecha(data.date);
          this.form.patchValue({
            name: data.name,
            email: data.email,
            tel: data.tel,
            date: formattedDate,
            time: data.time,
            service: data.service,
            notes: data.notes
          });
        }
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  saveBooking(): void {
    if (this.form.invalid) {
      this.error = 'Please fill all required fields';
      return;
    }

    const booking: Booking = {
      name: this.form.value.name,
      email: this.form.value.email,
      tel: this.form.value.tel,
      date: this.form.value.date,
      time: this.form.value.time,
      service: this.form.value.service,
      notes: this.form.value.notes
    };

    if (this.bookingId) {
      this.dataService.updateBooking(this.bookingId, booking).pipe(
        catchError(error => {
          this.error = 'Error updating booking';
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.dataService.addBooking(booking).pipe(
        catchError(error => {
          this.error = 'Error adding booking';
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.router.navigate(['/home']);
        }
      });
    }
  }

  deleteBooking(): void {
    if (this.bookingId) {
      if (confirm('¿Estas seguro que quieres eliminar esta reserva?')) {
        this.dataService.deleteBooking(this.bookingId).pipe(
          catchError(error => {
            this.error = 'Error deleting booking';
            return of(null);
          })
        ).subscribe(response => {
          if (response) {
            this.router.navigate(['/home']);
          }
        });
      }
    }
  }
}
