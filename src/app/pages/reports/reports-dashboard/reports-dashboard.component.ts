import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ReportsService } from 'src/app/services/report.service';

@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './reports-dashboard.component.html',
  styleUrls: ['./reports-dashboard.component.scss']
})
export class ReportsDashboardComponent implements OnInit {

  // PIE
  pie1: any;
  pie2: any;
  pie3: any;

  // BARS
  bar1: any;
  bar2: any;
  bar3: any;

  // LINES
  line1: any;
  line2: any;
  line3: any;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    /* PIE REPORTS */
    this.reportsService.getOrderStatus().subscribe(res =>
      this.pie1 = { labels: res.labels, datasets: [{ data: res.data }] });

    this.reportsService.getMotoUsage().subscribe(res =>
      this.pie2 = { labels: res.labels, datasets: [{ data: res.data }] });

    this.reportsService.getDayNightSales().subscribe(res =>
      this.pie3 = { labels: res.labels, datasets: [{ data: res.data }] });

    /* BAR REPORTS */
    this.reportsService.getMonthlyOrders().subscribe(res =>
      this.bar1 = { labels: res.labels, datasets: [{ label: 'Pedidos', data: res.data }] });

    this.reportsService.getRestaurantSales().subscribe(res =>
      this.bar2 = { labels: res.labels, datasets: [{ label: 'Ventas', data: res.data }] });

    this.reportsService.getMotoDeliveries().subscribe(res =>
      this.bar3 = { labels: res.labels, datasets: [{ label: 'Entregas', data: res.data }] });

    /* LINE REPORTS */
    this.reportsService.getDailyOrders().subscribe(res =>
      this.line1 = { labels: res.labels, datasets: [{ label: 'Pedidos por día', data: res.data }] });

    this.reportsService.getWeeklyRevenue().subscribe(res =>
      this.line2 = { labels: res.labels, datasets: [{ label: 'Ingresos', data: res.data }] });

    this.reportsService.getHourlyOrders().subscribe(res =>
      this.line3 = { labels: res.labels, datasets: [{ label: 'Pedidos por hora', data: res.data }] });
  }
}
