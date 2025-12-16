import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /* ===============================
     PIE CHARTS
  ================================ */
  getOrderStatus() {
    return this.http.get<any>(`${this.baseUrl}/pieReports`).pipe(
      map(r => ({
        labels: r.orderStatus.labels,
        data: r.orderStatus.values
      }))
    );
  }

  getMotoUsage() {
    return this.http.get<any>(`${this.baseUrl}/pieReports`).pipe(
      map(r => ({
        labels: r.motoUsage.labels,
        data: r.motoUsage.values
      }))
    );
  }

  getDayNightSales() {
    return this.http.get<any>(`${this.baseUrl}/pieReports`).pipe(
      map(r => ({
        labels: r.dayNightSales.labels,
        data: r.dayNightSales.values
      }))
    );
  }

  /* ===============================
     BAR CHARTS
  ================================ */
  getMonthlyOrders() {
    return this.http.get<any>(`${this.baseUrl}/barReports`).pipe(
      map(r => ({
        labels: r.monthlyOrders.labels,
        data: r.monthlyOrders.values
      }))
    );
  }

  getRestaurantSales() {
    return this.http.get<any>(`${this.baseUrl}/barReports`).pipe(
      map(r => ({
        labels: r.restaurantSales.labels,
        data: r.restaurantSales.values
      }))
    );
  }

  getMotoDeliveries() {
    return this.http.get<any>(`${this.baseUrl}/barReports`).pipe(
      map(r => ({
        labels: r.motoDeliveries.labels,
        data: r.motoDeliveries.values
      }))
    );
  }

  /* ===============================
     LINE CHARTS
  ================================ */
  getDailyOrders() {
    return this.http.get<any>(`${this.baseUrl}/lineReports`).pipe(
      map(r => ({
        labels: r.dailyOrders.labels,
        data: r.dailyOrders.values
      }))
    );
  }

  getWeeklyRevenue() {
    return this.http.get<any>(`${this.baseUrl}/lineReports`).pipe(
      map(r => ({
        labels: r.weeklyRevenue.labels,
        data: r.weeklyRevenue.values
      }))
    );
  }

  getHourlyOrders() {
    return this.http.get<any>(`${this.baseUrl}/lineReports`).pipe(
      map(r => ({
        labels: r.hourlyOrders.labels,
        data: r.hourlyOrders.values
      }))
    );
  }
}
