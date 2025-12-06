import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Motorcycle } from '../models/Motorcycle';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {

  private API_URL = `${environment.url_web_socket}/motorcycles`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /** =====================================================
   * GET ALL MOTORCYCLES
   * GET /motorcycles
   ====================================================== */
  getAll(): Observable<Motorcycle[]> {
    return this.http.get<Motorcycle[]>(`${this.API_URL}`);
  }

  /** =====================================================
   * GET BY ID
   * GET /motorcycles/:id
   ====================================================== */
  getById(id: number): Observable<Motorcycle> {
    return this.http.get<Motorcycle>(`${this.API_URL}/${id}`);
  }

  /** =====================================================
   * CREATE MOTORCYCLE
   * POST /motorcycles
   * Body: { name, address, phone, email }
   ====================================================== */
  create(motorcycle: Motorcycle): Observable<Motorcycle> {
    return this.http.post<Motorcycle>(`${this.API_URL}`, motorcycle, this.httpOptions);
  }

  /** =====================================================
   * UPDATE MOTORCYCLE
   * PUT /motorcycles/:id
   ====================================================== */
  update(id: number, motorcycle: Motorcycle): Observable<Motorcycle> {
    return this.http.put<Motorcycle>(`${this.API_URL}/${id}`, motorcycle, this.httpOptions);
  }

  /** =====================================================
   * DELETE MOTORCYCLE
   * DELETE /motorcycles/:id
   ====================================================== */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
