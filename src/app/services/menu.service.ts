import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Menu } from '../models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private API_URL = `${environment.url_web_socket}/menus`;

  constructor(private http: HttpClient) {}

  /** =====================================================
   * GET ALL MENUS
   * GET /menus
   ====================================================== */
  getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.API_URL}`);
  }

  /** =====================================================
   * GET BY ID
   * GET /menus/:id
   ====================================================== */
  getById(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.API_URL}/${id}`);
  }

  /** =====================================================
   * CREATE MENU
   * POST /menus
   * Body: { name, address, phone, email }
   ====================================================== */
  create(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${this.API_URL}`, menu);
  }

  /** =====================================================
   * UPDATE MENU
   * PUT /menus/:id
   ====================================================== */
  update(id: number, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.API_URL}/${id}`, menu);
  }

  /** =====================================================
   * DELETE MENU
   * DELETE /menus/:id
   ====================================================== */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
