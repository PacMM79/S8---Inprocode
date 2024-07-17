import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../services/mysql.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  datos: any[] = [];

  constructor(@Inject(DataService) private dataService: DataService) { }


  ngOnInit() {
    this.dataService.getDatos().subscribe(data => {
      this.datos = data;
    });
  }
}
