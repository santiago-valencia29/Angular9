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
    domain: ['#669900', '#66CC00', '#66FF00', '#00FF00','#00CC00', '#009900', '#00FFCC', '#66FFCC']
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
