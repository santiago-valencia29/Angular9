import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {

  }

  canActivate(): boolean {
    if (this.auth.estaAutenticado()) {
      return true;
    } else {
      Swal.fire({
        title: 'Sitio Restringido',
        icon: 'warning',
        text: 'Debe autenticarse'
      });
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
