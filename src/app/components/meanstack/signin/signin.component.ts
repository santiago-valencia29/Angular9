import { Component, OnInit } from '@angular/core';
import { authService } from '../../../services/meanstack/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.showLoading();
    this._authService.signIn(this.user)
      .subscribe(
        res => {
          // console.log(res.access_token);
          Swal.close();
          localStorage.setItem('token_mean', res.access_token)
          localStorage.setItem('user_mean', this.user.email)
          this.router.navigate(['/dyrcocinas'])
        }, err => {

          Swal.fire({
            title: 'ERROR',
            text: err.error,
            icon: 'error'
          })
          console.log(err)
        }
      )
  }


}
