import { Component, OnInit } from '@angular/core';
// import { multi } from './data';
import { BehaviorSubjectService } from 'src/app/services/behavior-subject.service';



@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {

  multi: any[];
  view: any[] = [800, 300];

  casos: any = [];
 

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dias';
  yAxisLabel: string = 'Número de casos';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#009688']
  };

  constructor(private _behaviorSubject: BehaviorSubjectService) {
    this.multi = this._behaviorSubject.serviceExternalBehavior();
    Object.assign(this,this.multi);

  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
   
    
   
  }



}
