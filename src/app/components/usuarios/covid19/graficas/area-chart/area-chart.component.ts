import { Component, OnInit } from '@angular/core';
import { multi } from './data';


@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {

  multi: any[];
  view: any[] = [700, 300];

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
    domain: ['#b32d6e']
  };

  constructor() {
    Object.assign(this, { multi });

   }

   onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
