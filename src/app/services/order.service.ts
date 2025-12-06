import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';  // Ajusta ruta si es necesario
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private API_URL = `${environment.url_web_socket}/orders`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /** =====================================================
   * GET ALL ORDERS
   * GET /orders
   ====================================================== */
  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL}`);
  }

  /** =====================================================
   * GET BY ID
   * GET /orders/:id
   ====================================================== */
  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL}/${id}`);
  }

  /** =====================================================
   * CREATE ORDER
   * POST /orders
   * Body: { name, address, phone, email }
   ====================================================== */
  create(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.API_URL}`, order, this.httpOptions);
  }

  /** =====================================================
   * UPDATE ORDER
   * PUT /orders/:id
   ====================================================== */
  update(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.API_URL}/${id}`, order);
  }

  /** =====================================================
   * DELETE ORDER
   * DELETE /orders/:id
   ====================================================== */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
