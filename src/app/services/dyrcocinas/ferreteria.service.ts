import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ferreteria } from '../../models/dyrcocinas/ferreteria.model';
import { global } from '../meanstack/global';


@Injectable({
    providedIn: 'root'
  })

  export class FerreteriaService {
        public url: string;
        headers = new HttpHeaders().set('Content-Type','application/json');

        constructor(
            private _http: HttpClient
        ){
            this.url = global.url;
        }

        saveFerreteria(ferreteria: Ferreteria): Observable<any>{
            let params = JSON.stringify(ferreteria);
            return this._http.post(this.url+'ferreteria/save-ferreteria',params,{headers: this.headers});
        }

        getFerreterias(): Observable<any>{
            return this._http.get(this.url+'ferreteria',{headers: this.headers})
        }

        putFerreteria(_id:string, ferreteria:Ferreteria): Observable<any>{
              return this._http.put(`${this.url}ferreteria/update?ferreteriaID=${_id}`,ferreteria,{headers: this.headers})
        }

        deleteFerreteria(_id: string){
            return this._http.delete(`${this.url}ferreteria/delete?ferreteriaID=${_id}`,{headers: this.headers})
        }

  }
