import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { User } from '../../models/User';
import { SecurityService } from 'src/app/services/security.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: User = { email: "", password: "" };

  constructor(
    private securityService: SecurityService,
    private firebaseAuth: FirebaseAuthService,
    private router: Router
  ) {}

  login() {
    this.securityService.login(this.user).subscribe({
      next: (data) => {
        this.securityService.saveSession(data);
        this.router.navigate(["dashboard"]);
      },
      error: () => {
        Swal.fire("Autenticación Inválida", "Usuario o contraseña incorrectos", "error");
      }
    });
  }

  googleLogin() {
    this.firebaseAuth.loginWithGoogle()
      .then(async res => {

        const token = await res.user.getIdToken();

        this.securityService.saveSession({
          id: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
          token: token,
          photo: res.user.photoURL // <-- FOTO AQUÍ
        });

        this.router.navigate(["dashboard"]);
      })
      .catch(err => {
        Swal.fire("Google Error", err.message, "error");
      });
  }

  githubLogin() {
    this.firebaseAuth.loginWithGithub()
      .then(async res => {

        const token = await res.user.getIdToken();

        this.securityService.saveSession({
          id: res.user.uid,
          name: res.user.displayName || "",
          email: res.user.email || "",
          token: token,
          photo: res.user.photoURL // <-- FOTO AQUÍ TAMBIÉN
        });

        this.router.navigate(["dashboard"]);
      })
      .catch(() =>
        Swal.fire("Error", "No se pudo iniciar sesión con GitHub", "error")
      );
  }
}
