import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  private cargardata = new BehaviorSubject<any>(0);
  public cargar$ = this.cargardata.asObservable();


  constructor() { }

  serviceExternalBehavior(data?: any){
    if (data == null){
      return this.cargardata.getValue();
    };
    this.cargardata.next(data);
    console.log(this.cargardata.getValue());
    return this.cargardata.getValue();
  }
}
