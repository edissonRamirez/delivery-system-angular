import { Injectable } from "@angular/core";
import { Customer } from "../models/Customer";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class CustomerService {

  private url = environment.url_web_socket + '/customers';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Customer[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Customer>(`${this.url}/${id}`);
  }

  create(data: Customer) {
    return this.http.post(this.url, data);
  }

  update(id: number, data: Customer) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
