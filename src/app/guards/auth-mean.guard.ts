import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authService } from '../services/meanstack/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthMeanGuard implements CanActivate {

  constructor(private _authService: authService,
    private router: Router) {

  }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true;
    }
      else {
        Swal.fire({
          title: 'Sitio Restringido',
          icon: 'warning',
          text: 'Debe autenticarse con MEAN 123456'
        });
        this.router.navigateByUrl('/signin');
        // this.auth.logout();
        // localStorage.removeItem('email');
        return false;
    }

  }


}
