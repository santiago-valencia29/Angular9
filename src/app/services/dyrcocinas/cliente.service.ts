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

        constructor(
            private _http: HttpClient
        ){
            this.url = global.url;
        }

        saveCliente(cliente: Cliente): Observable<any>{
            let params = JSON.stringify(cliente);
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.post(this.url+'save-cliente',params,{headers: headers});
        }

        getClientes(): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.get(this.url+'Clientes',{headers: headers})
        }

        putCliente(_id:string, cliente:Cliente): Observable<any>{
              return this._http.put(`${this.url}cliente/${_id}`,cliente)
        }

        deleteCliente(id: string){
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.delete(`${this.url}/cliente/${id}`,{headers: headers})
        }

  }
