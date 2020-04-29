import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColorMadecor } from '../../models/dyrcocinas/colorMadecor.model';
import { global } from '../meanstack/global';


@Injectable({
    providedIn: 'root'
  })

  export class ColorMadecorService {
        public url: string;
        headers = new HttpHeaders().set('Content-Type','application/json');
        constructor(
            private _http: HttpClient
        ){
            this.url = global.url;
        }

        saveColorMadecor(colorMadecor: ColorMadecor): Observable<any>{
            let params = JSON.stringify(colorMadecor);
            
            return this._http.post(this.url+'color-madecor/save-colorMadecor',params,{headers: this.headers});
        }

        getColorMadecors(): Observable<any>{
            return this._http.get(this.url+'color-madecor',{headers: this.headers})
        }

        putColorMadecor(_id:string, colorMadecor:ColorMadecor): Observable<any>{
              return this._http.put(`${this.url}color-madecor/update?colorMadecorID=${_id}`,colorMadecor,{headers: this.headers})
        }

        deleteColorMadecor(_id: string){
            return this._http.delete(`${this.url}color-madecor/delete?colorMadecorID=${_id}`,{headers: this.headers})
        }

  }
