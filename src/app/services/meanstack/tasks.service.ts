import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { global } from './global';


@Injectable({
    providedIn: 'root'
  })

  export class tasksService {
        public url: string;

        constructor(
            private _http: HttpClient
        ){
            this.url = global.url;
        }

    
  }
