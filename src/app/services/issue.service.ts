import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Issue } from '../models/Issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private API_URL = `${environment.url_web_socket}/issues`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /** =====================================================
   * GET ALL ISSUES
   * GET /issues
   ====================================================== */
  getAll(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.API_URL}`);
  }

  /** =====================================================
   * GET BY ID
   * GET /issues/:id
   ====================================================== */
  getById(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.API_URL}/${id}`);
  }

  /** =====================================================
   * CREATE ISSUE
   * POST /issues
   * Body: { name, address, phone, email }
   ====================================================== */
  create(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.API_URL}`, issue, this.httpOptions);
  }

  /** =====================================================
   * UPDATE ISSUE
   * PUT /issues/:id
   ====================================================== */
  update(id: number, issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.API_URL}/${id}`, issue, this.httpOptions);
  }

  /** =====================================================
   * DELETE ISSUE
   * DELETE /issues/:id
   ====================================================== */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
