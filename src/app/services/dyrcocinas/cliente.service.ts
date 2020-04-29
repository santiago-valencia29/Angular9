import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/dyrcocinas/cliente.model';
import { global } from '../meanstack/global';


@Injectable({
    providedIn: 'root'
  })

  export class ClienteService {
        public url: string;
        headers = new HttpHeaders().set('Content-Type','application/json');
        constructor(
            private _http: HttpClient
        ){
            this.url = global.url;
        }

        saveCliente(cliente: Cliente): Observable<any>{
            let params = JSON.stringify(cliente);
            return this._http.post(this.url+'cliente/save-cliente',params,{headers: this.headers});
        }

        getClientes(): Observable<any>{
            return this._http.get(this.url+'cliente',{headers: this.headers})
        }

        getCliente(_id:string): Observable<any>{
            return this._http.get(`${this.url}cliente/${_id}`,{headers: this.headers})
        }

        putCliente(_id:string, cliente:Cliente): Observable<any>{
            return this._http.put(`${this.url}cliente/update?clienteID=${_id}`,cliente,{headers: this.headers})
        }

        deleteCliente(_id: string){
            return this._http.delete(`${this.url}cliente/delete?clienteID=${_id}`,{headers: this.headers})
        }

  }
