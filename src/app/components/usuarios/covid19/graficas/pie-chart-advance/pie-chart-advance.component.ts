import { Component, OnInit } from '@angular/core';
// import { single } from './data';
import { BehaviorSubjectService } from '../../../../../services/behavior-subject.service';


@Component({
  selector: 'app-pie-chart-advance',
  templateUrl: './pie-chart-advance.component.html',
  styleUrls: ['./pie-chart-advance.component.css']
})
export class PieChartAdvanceComponent implements OnInit {

  single: any[];
  view: any[] = [410, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#268bd2', '#A10A28', '#b58900']
  };
  constructor(private _behaviorSubject:BehaviorSubjectService) { 
    this.single=this._behaviorSubject.serviceExternalPieChart();
    Object.assign(this, this.single);
  }

  ngOnInit(): void {
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
