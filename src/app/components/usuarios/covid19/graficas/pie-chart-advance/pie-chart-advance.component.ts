import { Component, OnInit } from '@angular/core';
import { single } from './data';


@Component({
  selector: 'app-pie-chart-advance',
  templateUrl: './pie-chart-advance.component.html',
  styleUrls: ['./pie-chart-advance.component.css']
})
export class PieChartAdvanceComponent implements OnInit {

  single: any[];
  view: any[] = [700, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor() { 
    Object.assign(this, { single });
  }

  ngOnInit(): void {
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
