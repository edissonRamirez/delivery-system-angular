import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) { }

  // Llama a la API pública
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>('https://api-colombia.com/api/v1/Region');
  }
}
