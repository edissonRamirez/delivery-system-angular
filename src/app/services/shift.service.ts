import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Shift } from '../models/Shift';

@Injectable({
    providedIn: 'root'
})
export class ShiftService {

    private API_URL = `${environment.url_web_socket}/shifts`;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getAll(): Observable<Shift[]> {
        return this.http.get<Shift[]>(`${this.API_URL}`);
    }

    getById(id: number): Observable<Shift> {
        return this.http.get<Shift>(`${this.API_URL}/${id}`);
    }

    create(shift: Shift): Observable<Shift> {
        return this.http.post<Shift>(`${this.API_URL}`, shift, this.httpOptions);
    }

    update(id: number, shift: Shift): Observable<Shift> {
        return this.http.put<Shift>(`${this.API_URL}/${id}`, shift, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/${id}`);
    }
}
