import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantType } from '../models/restaurant-type.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestauranttypeService {

  private url = `${environment.url_web_socket}/restauranttype`;

  constructor(private http: HttpClient) { }

  /**
   * Crea un RestaurantType (relación restaurante–región)
   * @param restaurant_id ID del restaurante
   * @param region_id ID de la región
   * @returns Observable con el objeto creado
   */
  AddRegionToRestaurant(restaurant_id: number, region_id: number): Observable<RestaurantType> {
    const payload: RestaurantType = { restaurant_id, region_id };
    return this.http.post<RestaurantType>(this.url, payload);
  }
}
