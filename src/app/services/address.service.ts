import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private API_URL = `${environment.url_web_socket}/addresses`;

  constructor(private http: HttpClient) {}

  /** =====================================================
   * GET ALL ADDRESSES
   * GET /addresses
   ====================================================== */
  getAll(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.API_URL}`);
  }

  /** =====================================================
   * GET BY ID
   * GET /addresses/:id
   ====================================================== */
  getById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.API_URL}/${id}`);
  }

  /** =====================================================
   * CREATE ADDRESS
   * POST /addresses
   * Body: { name, address, phone, email }
   ====================================================== */
  create(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.API_URL}`, address);
  }

  /** =====================================================
   * UPDATE ADDRESS
   * PUT /addresses/:id
   ====================================================== */
  update(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.API_URL}/${id}`, address);
  }

  /** =====================================================
   * DELETE ADDRESS
   * DELETE /addresses/:id
   ====================================================== */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
