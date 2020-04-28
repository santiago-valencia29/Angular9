import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })

  export class AddCustomHeadersInterceptor implements HttpInterceptor {
    urlsToNotUse: Array<string>;
  
    constructor(private _authService:authService
    ) {
  
      this.urlsToNotUse= [
        'identitytoolkit.googleapis.com/v1',
        'www.datos.gov.co/resource',
        'myController1/myAction3'
      ];
    }
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (this.isValidRequestForInterceptor(request.url)) {
        let modifiedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this._authService.getToken()}`
          }
        });
  
        return next.handle(modifiedRequest);
      }
      return next.handle(request);
    }
  
    private isValidRequestForInterceptor(requestUrl: string): boolean {
      let positionIndicator: string = '/';
      let position = requestUrl.indexOf(positionIndicator);
      if (position > 0) {
        let destination: string = requestUrl.substr(position + positionIndicator.length);
        for (let address of this.urlsToNotUse) {
          if (new RegExp(address).test(destination)) {
            return false;
          }
        }
      }
      return true;
    }
  }