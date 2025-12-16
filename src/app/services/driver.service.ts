import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Driver } from '../models/Driver';

@Injectable({
    providedIn: 'root'
})
export class DriverService {

    private API_URL = `${environment.url_web_socket}/drivers`;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getAll(): Observable<Driver[]> {
        return this.http.get<Driver[]>(`${this.API_URL}`);
    }

    getById(id: number): Observable<Driver> {
        return this.http.get<Driver>(`${this.API_URL}/${id}`);
    }

    create(driver: Driver): Observable<Driver> {
        return this.http.post<Driver>(`${this.API_URL}`, driver, this.httpOptions);
    }

    update(id: number, driver: Driver): Observable<Driver> {
        return this.http.put<Driver>(`${this.API_URL}/${id}`, driver, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/${id}`);
    }
}
