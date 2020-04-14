import { Component, OnInit, } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { SetUserAction } from 'src/app/store/actions';
import { authService } from '../../services/meanstack/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  logout: boolean;
  usuario: string;
  currentUrl: string;

  constructor(private auth: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private authService: authService,
  ) { }

  ngOnInit() {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // console.log(this.currentUrl);
      }
    });

    if (localStorage.getItem('user')) {
      this.store.dispatch(new SetUserAction(localStorage.getItem('user')));
    }

    this.store.select('auth')
      .subscribe(auth => {
        if (auth.user) {
          this.usuario = auth.user;
          this.logout = true;
        } else {
          this.logout = false;
        }
      });

  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }



  loggedIn_mean() {  // para interactuar con el ng container y template
    return this.authService.loggedIn();
  }

  logout_mean() {  // para interactuar con el ng container y template
    return this.authService.logout();
  }

}

