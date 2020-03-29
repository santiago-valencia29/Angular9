import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { authService } from './auth.service';


@Injectable({
    providedIn: 'root'
  })

  export class tokenService implements HttpInterceptor {

    constructor( private _authService:authService
        ){
        }


        intercept(req, next){
            const tokenizeReq = req.clone({
                setHeaders:{
                    Authorization: `Bearer ${this._authService.getToken()}`
                }
            })

            return next.handle(tokenizeReq); //añadir una cabezera en cada petición
        }

       
       

  }
