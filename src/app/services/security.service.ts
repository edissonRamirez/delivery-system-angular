import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  theUser = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) {
    this.verifyActualSession();
  }

  /**
  * Realiza la petición al backend con el correo y la contraseña
  * para verificar si existe o no en la plataforma
  * @param infoUsuario JSON con la información de correo y contraseña
  * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
  */
  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.url_security}/login`, user);
  }

  /*
  Guardar la información de usuario en el local storage
  */
  saveSession(dataSesion: any) {
    let data: User = {
      id: dataSesion["id"],
      name: dataSesion["name"],
      email: dataSesion["email"],
      password: "",
      token: dataSesion["token"],
      photo: dataSesion["photo"] || "assets/img/theme/team-4-800x800.jpg" // fallback
    };

    localStorage.setItem('sesion', JSON.stringify(data));
    this.setUser(data);
  }

  setUser(user: User) {
    this.theUser.next(user);
  }

  getUser() {
    return this.theUser.asObservable();
  }

  /**
    * Permite obtener la información de usuario
    * que tiene la función activa y servirá
    * para acceder a la información del token
*/

  public get activeUserSession(): User {
    return this.theUser.value;
  }

  logout() {
    localStorage.removeItem('sesion');
    this.setUser(new User());
  }

  verifyActualSession() {
    let actualSesion = this.getSessionData();
    if (actualSesion) {
      this.setUser(JSON.parse(actualSesion));
    }
  }

  existSession(): boolean {
    return !!this.getSessionData();
  }

  getSessionData() {
    return localStorage.getItem('sesion');
  }
}
