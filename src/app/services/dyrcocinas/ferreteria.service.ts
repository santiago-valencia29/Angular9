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

        constructor(
            private _http: HttpClient
        ){
            this.url = global.url;
        }

        saveFerreteria(ferreteria: Ferreteria): Observable<any>{
            let params = JSON.stringify(ferreteria);
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.post(this.url+'save-ferreteria',params,{headers: headers});
        }

        getFerreterias(): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.get(this.url+'Ferreterias',{headers: headers})
        }

        putFerreteria(_id:string, ferreteria:Ferreteria): Observable<any>{
              return this._http.put(`${this.url}ferreteria/${_id}`,ferreteria)
        }

        deleteFerreteria(id: string){
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.delete(`${this.url}/ferreteria/${id}`,{headers: headers})
        }

  }
