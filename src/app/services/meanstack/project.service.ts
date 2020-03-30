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

        getProjects(): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type','application/json');

            return this._http.get(this.url+'projects',{headers: headers})

        }

        putProject(_id:string, project:Project): Observable<any>{
        
              return this._http.put(`${this.url}project/${_id}`,project)

        }



        deleteProject(id: string){
            let headers = new HttpHeaders().set('Content-Type','application/json');
            return this._http.delete(`${this.url}/project/${id}`,{headers: headers})
        }

  }
