import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class Covid19Service {

    token_apigov = 'vGdzkJQEpTZdtMVuuSSBSiGHX';
    url = 'https://www.datos.gov.co/'
    constructor(
        private _http: HttpClient
    ) { }

    getDataCovid(){

        let headers = new HttpHeaders().set('Content-Type','application/json');
        headers.append('X-App-Token', this.token_apigov)

        return this._http.get(this.url+'resource/gt2j-8ykr.json?$limit=30000',{headers: headers})

    }


}