import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from 'src/app/services/behavior-subject.service';

@Component({
  selector: 'app-area-muni-chart',
  templateUrl: './area-muni-chart.component.html',
  styleUrls: ['./area-muni-chart.component.css']
})
export class AreaMuniChartComponent implements OnInit {
  multi: any[];
  view: any[] = [1600, 400];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Municipios';
  yAxisLabel: string = 'Número de casos';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#ffc300']
  };

  constructor(private _behaviorSubject: BehaviorSubjectService) {
    this.multi = this._behaviorSubject.serviceExternalAreaMuniChart();
    Object.assign(this,this.multi);
   }



  ngOnInit(): void {
  }

  onSelect(event) {
    // console.log(event);
  }

}
