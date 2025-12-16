import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Photo } from '../models/Photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private API_URL = `${environment.url_web_socket}/photos`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /** =====================================================
   * GET ALL PHOTOS
   * GET /photos
   ====================================================== */
  getAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.API_URL}`);
  }

  /** =====================================================
   * GET BY ID
   * GET /photos/:id
   ====================================================== */
  getById(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.API_URL}/${id}`);
  }

  /** =====================================================
   * CREATE PHOTO
   * POST /photos
   * Body: { name, address, phone, email } or FormData
   ====================================================== */
  create(photo: Photo | FormData): Observable<Photo> {
    if (photo instanceof FormData) {
      return this.http.post<Photo>(`${this.API_URL}/upload`, photo);
    }
    return this.http.post<Photo>(`${this.API_URL}`, photo, this.httpOptions);
  }

  /** =====================================================
   * UPDATE PHOTO
   * PUT /photos/:id
   ====================================================== */
  update(id: number, photo: Photo | FormData): Observable<Photo> {
    if (photo instanceof FormData) {
      // For PUT with FormData, depending on backend, it might be better to use POST with _method or similar,
      // but assuming standard PUT multipart support.
      return this.http.put<Photo>(`${this.API_URL}/${id}`, photo);
    }
    return this.http.put<Photo>(`${this.API_URL}/${id}`, photo, this.httpOptions);
  }

  /** =====================================================
   * DELETE PHOTO
   * DELETE /photos/:id
   ====================================================== */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
