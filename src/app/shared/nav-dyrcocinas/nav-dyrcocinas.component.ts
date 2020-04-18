import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { authService } from '../../services/meanstack/auth.service';


@Component({
  selector: 'app-nav-dyrcocinas',
  templateUrl: './nav-dyrcocinas.component.html',
  styleUrls: ['./nav-dyrcocinas.component.css']
})
export class NavDyrcocinasComponent implements OnInit {

  logout: boolean;
  showUser:string;

  constructor(private authService: authService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {

    if (this.loggedIn_mean()) {
       this.logout = true;
       this.showUser = localStorage.getItem('user_mean')

    } else {
      this.logout = false;
    };
  }

  loggedIn_mean() {  // para interactuar con el ng container y template
    return this.authService.loggedIn();

  }

  logout_mean() {  // para interactuar con el ng container y template
    return this.authService.logout();
  }

}
