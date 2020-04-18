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

        constructor(
            private _http: HttpClient
        ){
            this.url = global.url;
        }

        saveColorMadecor(colorMadecor: ColorMadecor): Observable<any>{
            let params = JSON.stringify(colorMadecor);
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.post(this.url+'save-colorMadecor',params,{headers: headers});
        }

        getColorMadecors(): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.get(this.url+'ColorMadecors',{headers: headers})
        }

        putColorMadecor(_id:string, colorMadecor:ColorMadecor): Observable<any>{
              return this._http.put(`${this.url}colorMadecor/${_id}`,colorMadecor)
        }

        deleteColorMadecor(id: string){
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.delete(`${this.url}/colorMadecor/${id}`,{headers: headers})
        }

  }
