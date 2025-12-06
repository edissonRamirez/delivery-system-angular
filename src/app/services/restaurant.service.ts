import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/Restaurant';  // Ajusta ruta si es necesario
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private API_URL = `${environment.url_web_socket}/restaurants`;

  constructor(private http: HttpClient) {}

  /** =====================================================
   * GET ALL RESTAURANTS
   * GET /restaurants
   ====================================================== */
  getAll(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.API_URL}`);
  }

  /** =====================================================
   * GET BY ID
   * GET /restaurants/:id
   ====================================================== */
  getById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.API_URL}/${id}`);
  }

  /** =====================================================
   * CREATE RESTAURANT
   * POST /restaurants
   * Body: { name, address, phone, email }
   ====================================================== */
  create(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.API_URL}`, restaurant);
  }

  /** =====================================================
   * UPDATE RESTAURANT
   * PUT /restaurants/:id
   ====================================================== */
  update(id: number, restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.API_URL}/${id}`, restaurant);
  }

  /** =====================================================
   * DELETE RESTAURANT
   * DELETE /restaurants/:id
   ====================================================== */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
