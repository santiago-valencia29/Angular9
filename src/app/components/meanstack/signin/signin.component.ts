import { Component, OnInit } from '@angular/core';
import { authService } from '../../../services/meanstack/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }
  constructor(private _authService: authService, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this._authService.signIn(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token_mean', res.token)
          this.router.navigate(['/private'])
        }, err => {
          console.log(err)
        }
      )
    console.log(this.user)
  }


}
