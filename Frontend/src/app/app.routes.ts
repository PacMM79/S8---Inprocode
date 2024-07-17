import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { FullCalendarComponent } from './components/full-calendar/full-calendar.component';
import { ChartsComponent } from './components/charts/charts.component';
import { AddEditBookingComponent } from './components/add-edit-booking/add-edit-booking.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add', component: AddEditBookingComponent },
  { path: 'edit/:id', component: AddEditBookingComponent },
  { path: 'map', component: MapComponent },
  { path: 'calendar', component: FullCalendarComponent },
  { path: 'charts', component: ChartsComponent },
];
