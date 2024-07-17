import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { EventService } from '../../services/calendar-events.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit {
  chart: any = [];
  chart2: any = [];
  chart3: any = [];
  chart4: any = [];

  constructor(
    private bookingsService: BookingsService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    Chart.defaults.font.size = 14;
    Chart.defaults.color = 'rgb(130 130 130)';

    this.loadBookingsData();
    this.loadEventsData();
  }

  loadBookingsData() {
    this.bookingsService.getDatos().subscribe(data => {
      this.createLineChart(this.aggregateByMonth(data, 'date'));
      this.createDoughnutChart(this.aggregateByHourRange(data));
      this.createPieChart(this.aggregateByService(data));
    });
  }

  loadEventsData() {
    this.eventService.getEvents().subscribe(data => {
      this.createBarChart(this.aggregateByMonth(data, 'start'));
    });
  }

  aggregateByMonth(data: any[], dateKey: string) {
    const counts = new Array(12).fill(0);
    data.forEach(item => {
      const month = new Date(item[dateKey]).getMonth();
      counts[month]++;
    });
    return counts;
  }

  aggregateByHourRange(data: any[]) {
    const ranges = ['Mañana', 'Tarde', 'Noche'];
    const counts = new Array(3).fill(0);
    data.forEach(item => {
      const hour = new Date(`1970-01-01T${item.time}`).getHours();
      if (hour < 12) counts[0]++;
      else if (hour < 18) counts[1]++;
      else counts[2]++;
    });
    return { labels: ranges, data: counts };
  }

  aggregateByService(data: any[]) {
    const serviceCounts: { [key: string]: number } = {};
    data.forEach(item => {
      serviceCounts[item.service] = (serviceCounts[item.service] || 0) + 1;
    });
    return { labels: Object.keys(serviceCounts), data: Object.values(serviceCounts) as number[] };
  }

  createLineChart(data: number[]) {
    this.chart = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{ label: '# de reservas', data, borderWidth: 1 }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
    });
  }

  createBarChart(data: number[]) {
    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{ label: '# de eventos', data, borderWidth: 1 }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
    });
  }

  createDoughnutChart(data: { labels: string[], data: number[] }) {
    this.chart3 = new Chart('canvas3', {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          label: '# de reservas por rango de hora',
          data: data.data,
          borderWidth: 1,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  createPieChart(data: { labels: string[], data: number[] }) {
    this.chart4 = new Chart('canvas4', {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          label: '# de reservas por servicio',
          data: data.data,
          borderWidth: 1,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}
