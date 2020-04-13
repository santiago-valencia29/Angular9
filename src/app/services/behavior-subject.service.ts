import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  private loadData = new BehaviorSubject<any>(0);
  public load$ = this.loadData.asObservable();

  private loadDataAreaChart = new BehaviorSubject<any>(0);
  public loadAreaChart$ = this.loadDataAreaChart.asObservable();


  constructor() { }


  //ejemplo de estructura
  serviceExternalBehavior(data?: any){
    if (data == null){
      return this.loadData.getValue();
    };
    this.loadData.next(data);
    // console.log(this.loadData.getValue());
    return this.loadData.getValue();
  }


  //Servicios alimentando componentes:

  serviceExternalAreaChart(data?: any){
    if (data == null){
      return this.loadData.getValue();
    };
    this.loadData.next(data);
    return this.loadData.getValue();
  }

}
