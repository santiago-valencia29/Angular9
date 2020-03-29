import { Component, OnInit } from '@angular/core';
import { authService } from '../../../services/meanstack/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    email:'',
    password:''
  }
  constructor(private _authService:authService,private router: Router) { }

  ngOnInit() {
  }

  signUp(){
    this._authService.signUp(this.user)
    .subscribe(
      
      resp=>{
        console.log(resp)
        localStorage.setItem('token_mean',resp.token);
        this.router.navigate(['/private']);
      

    },
      error => console.log(error))
  }

}
