import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })

  export class authService {
        public url: string;

        constructor(
            private _http: HttpClient,private router:Router
        ){
            this.url = global.url;
        }


        signUp(user){
            return this._http.post<any>(this.url +'register',user);
        }

        signIn(user){
            return this._http.post<any>(this.url +'login',user);
        }

        loggedIn(){
            return !!localStorage.getItem('token_mean'); // !! si exite
        }

        getToken(){
           return localStorage.getItem('token_mean');
        }

        logout(){
            localStorage.removeItem('token_mean');
            this.router.navigate(['/signin'])
        }

       

  }
