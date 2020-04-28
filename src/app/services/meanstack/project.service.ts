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

        headers =  new HttpHeaders().set('Content-Type','application/json');

        constructor(
            private _http: HttpClient
        ){
            this.url = global.url;
        }

        saveProject(project: Project): Observable<any>{
            let params = JSON.stringify(project);
            return this._http.post(this.url+'project/save-project',params,{headers: this.headers});
        }

        getProjects(): Observable<any>{
            return this._http.get(this.url+'project',{headers: this.headers})
        }

        putProject(_id:string, project:Project): Observable<any>{
        
              return this._http.put(`${this.url}project/update?projectID=${_id}`,project)
        }

        deleteProject(id: string){
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.delete(`${this.url}project/delete?projectID=${id}`,{headers: headers})
        }

  }
