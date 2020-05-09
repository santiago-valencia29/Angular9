import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from 'src/app/services/behavior-subject.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  single: any[];
  view: any[] = [];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Condición Casos';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Núm Personas';

  colorScheme = {
    domain: ['#ffc300', '#ff5733', '#c70039', '#900c3e','#571845']
  };

  constructor(private _behaviorSubject:BehaviorSubjectService) { 
    this.view = [innerWidth / 1, 400];
    this.single=this._behaviorSubject.serviceExternalBarChart();
    Object.assign(this, this.single );
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


