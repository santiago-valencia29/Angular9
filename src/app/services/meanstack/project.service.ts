import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { global } from './global';


@Injectable({
    providedIn: 'root'
  })

  export class ProjectService {
        public url: string;

        constructor(
            private _http: HttpClient
        ){
            this.url = global.url;
        }

        saveProject(project: Project): Observable<any>{
            let params = JSON.stringify(project);

            let headers = new HttpHeaders().set('Content-Type','application/json');

            return this._http.post(this.url+'save-project',params,{headers: headers});
        }
  }
