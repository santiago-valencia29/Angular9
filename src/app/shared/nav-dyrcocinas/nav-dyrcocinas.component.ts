import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-nav-dyrcocinas',
  templateUrl: './nav-dyrcocinas.component.html',
  styleUrls: ['./nav-dyrcocinas.component.css']
})
export class NavDyrcocinasComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router,
    private store: Store<AppState>,
    ) { }

  ngOnInit(): void {
  }

}
