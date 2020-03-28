import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  private loadData = new BehaviorSubject<any>(0);
  public load$ = this.loadData.asObservable();


  constructor() { }

  serviceExternalBehavior(data?: any){
    if (data == null){
      return this.loadData.getValue();
    };
    this.loadData.next(data);
    // console.log(this.loadData.getValue());
    return this.loadData.getValue();
  }

}
