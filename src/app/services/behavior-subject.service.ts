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

  private loadDataPieChart = new BehaviorSubject<any>(0);
  public loadPieChart$ = this.loadDataPieChart.asObservable();

  private loadDataBarChart = new BehaviorSubject<any>(0);
  public loadBarChart$ = this.loadDataBarChart.asObservable();

  private loadDataLineChart = new BehaviorSubject<any>(0);
  public loadLineChart$ = this.loadDataLineChart.asObservable();

  private loadDataCake = new BehaviorSubject<any>(0);
  public loadCake$ = this.loadDataCake.asObservable();

  private loadDataAreaMuni = new BehaviorSubject<any>(0);
  public loadAreaMuni$ = this.loadDataAreaMuni.asObservable();

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
  serviceExternalAreaMuniChart(data?: any){
    if (data == null){
      return this.loadDataAreaMuni.getValue();
    };
    this.loadDataAreaMuni.next(data);
    return this.loadDataAreaMuni.getValue();
  }


  serviceExternalAreaChart(data?: any){
    if (data == null){
      return this.loadDataAreaChart.getValue();
    };
    this.loadDataAreaChart.next(data);
    return this.loadDataAreaChart.getValue();
  }

  serviceExternalPieChart(data?: any){
    if (data == null){
      return this.loadDataPieChart.getValue();
    };
    this.loadDataPieChart.next(data);
    return this.loadDataPieChart.getValue();
  }

  serviceExternalBarChart(data?: any){
    if (data == null){
      return this.loadDataBarChart.getValue();
    };
    this.loadDataBarChart.next(data);
    return this.loadDataBarChart.getValue();
  }

  serviceExternalLineChart(data?: any){
    if (data == null){
      return this.loadDataLineChart.getValue();
    };
    this.loadDataLineChart.next(data);
    return this.loadDataLineChart.getValue();
  }

  serviceExternalCake(data?: any){
    if (data == null){
      return this.loadDataCake.getValue();
    };
    this.loadDataCake.next(data);
    return this.loadDataCake.getValue();
  }

 

}
