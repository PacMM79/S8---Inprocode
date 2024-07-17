import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddEditBookingComponent } from './components/add-edit-booking/add-edit-booking.component';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, GoogleMapsModule, AddEditBookingComponent, ReactiveFormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Inprocode';
}
