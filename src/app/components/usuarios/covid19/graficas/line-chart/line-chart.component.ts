import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from 'src/app/services/behavior-subject.service';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  multi: any[];
  view: any[] = [];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Días';
  yAxisLabel: string = 'Número de casos';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#ff0000']
  };

  constructor(private _behaviorSubject:BehaviorSubjectService) { 
    this.view = [innerWidth / 1, 400];
    this.multi=this._behaviorSubject.serviceExternalLineChart();
    Object.assign(this, this.multi );
  }

  ngOnInit(): void {
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1, 400];
}

  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
