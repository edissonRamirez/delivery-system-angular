import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService,
    private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let theUser = this.securityService.activeUserSession
    const token = theUser["token"];
    // Si la solicitud es para la ruta de "login", no adjuntes el token
    // Excluir APIs externas (Groq, Google Gemini, etc.) del interceptor de autenticación
    if (request.url.includes('api.groq.com') || request.url.includes('googleapis.com') || request.url.includes('/login') || request.url.includes('/token-validation')) {
      return next.handle(request);
    } else {
      // Adjunta el token a la solicitud solo para el Backend
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            Swal.fire({
              title: 'No está autorizado para esta operación',
              icon: 'error',
              timer: 5000
            });
            this.router.navigateByUrl('/dashboard');
          } else if (err.status === 400) {
            Swal.fire({
              title: 'Existe un error, contacte al administrador',
              icon: 'error',
              timer: 5000
            });
          }

          return new Observable<never>();
        }));
    }
    // Continúa con la solicitud modificada

  }

}


