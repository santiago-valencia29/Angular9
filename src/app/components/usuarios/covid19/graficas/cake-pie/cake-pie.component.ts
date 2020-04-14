import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from '../../../../../services/behavior-subject.service';


@Component({
  selector: 'app-cake-pie',
  templateUrl: './cake-pie.component.html',
  styleUrls: ['./cake-pie.component.css']
})
export class CakePieComponent implements OnInit {
  single: any[];
  view: any[] = [400, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#bed8db', '#84dcc6', '#264e70', '#4990b7','#c2e812', '#fe9b42', '#e26d5a', '#c43c55']
  };
  constructor(private _behaviorSubject:BehaviorSubjectService) {
    
  }

  ngOnInit(): void {
    this.single=this._behaviorSubject.serviceExternalCake()
    Object.assign(this, this.single);
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
