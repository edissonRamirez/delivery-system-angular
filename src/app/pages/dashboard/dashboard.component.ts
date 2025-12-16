import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ReportsService } from 'src/app/services/report.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pie1: any; pie2: any; pie3: any;
  bar1: any; bar2: any; bar3: any;
  line1: any; line2: any; line3: any;

  constructor(private reports: ReportsService) {}

  ngOnInit(): void {

    // PIE CHARTS
    this.reports.getOrderStatus().subscribe(r =>
      this.pie1 = {
        labels: r.labels,
        datasets: [{ data: r.data, backgroundColor: ['#5e72e4','#fb6340','#f5365c'] }]
      }
    );

    this.reports.getMotoUsage().subscribe(r =>
      this.pie2 = {
        labels: r.labels,
        datasets: [{ data: r.data, backgroundColor: ['#2dce89','#11cdef','#f5365c'] }]
      }
    );

    this.reports.getDayNightSales().subscribe(r =>
      this.pie3 = {
        labels: r.labels,
        datasets: [{ data: r.data, backgroundColor: ['#172b4d','#5e72e4'] }]
      }
    );

    // BAR
    this.reports.getMonthlyOrders().subscribe(r =>
      this.bar1 = {
        labels: r.labels,
        datasets: [{ label: 'Pedidos', data: r.data, backgroundColor: '#5e72e4' }]
      }
    );

    this.reports.getRestaurantSales().subscribe(r =>
      this.bar2 = {
        labels: r.labels,
        datasets: [{ label: 'Ventas', data: r.data, backgroundColor: '#11cdef' }]
      }
    );

    this.reports.getMotoDeliveries().subscribe(r =>
      this.bar3 = {
        labels: r.labels,
        datasets: [{ label: 'Entregas', data: r.data, backgroundColor: '#2dce89' }]
      }
    );

    // LINE
    this.reports.getDailyOrders().subscribe(r =>
      this.line1 = {
        labels: r.labels,
        datasets: [{ label: 'Por Día', data: r.data, borderColor: '#5e72e4', fill: false }]
      }
    );

    this.reports.getWeeklyRevenue().subscribe(r =>
      this.line2 = {
        labels: r.labels,
        datasets: [{ label: 'Ingresos', data: r.data, borderColor: '#11cdef', fill: false }]
      }
    );

    this.reports.getHourlyOrders().subscribe(r =>
      this.line3 = {
        labels: r.labels,
        datasets: [{ label: 'Por Hora', data: r.data, borderColor: '#f5365c', fill: false }]
      }
    );
  }
}
