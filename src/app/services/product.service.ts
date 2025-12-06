import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';  // Ajusta ruta si es necesario
import { environment } from '../../environments/environment';
import { Restaurant } from '../models/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = `${environment.url_web_socket}/products`;

  constructor(private http: HttpClient) {}

  /** =====================================================
   * GET ALL PRODUCTS
   * GET /products
   ====================================================== */
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}`);
  }

  /** =====================================================
   * GET BY ID
   * GET /products/:id
   ====================================================== */
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  /** =====================================================
   * CREATE PRODUCT
   * POST /products
   * Body: { name, address, phone, email }
   ====================================================== */
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}`, product);
  }

  /** =====================================================
   * UPDATE PRODUCT
   * PUT /products/:id
   ====================================================== */
  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product);
  }

  /** =====================================================
   * DELETE PRODUCT
   * DELETE /products/:id
   ====================================================== */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
