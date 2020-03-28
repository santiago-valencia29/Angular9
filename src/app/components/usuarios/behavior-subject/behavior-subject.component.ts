import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { BehaviorSubjectService } from '../../../services/behavior-subject.service';

@Component({
  selector: 'app-behavior-subject',
  templateUrl: './behavior-subject.component.html',
  styleUrls: ['./behavior-subject.component.css']
})
export class BehaviorSubjectComponent implements OnInit {

  heroes: HeroeModel[]= []
  constructor(private _behaviorSubject:BehaviorSubjectService ) { }

  ngOnInit(): void {
    
  this.heroes = this._behaviorSubject.serviceExternalBehavior();
  }

  reiniciarBehavior(){
    
    this._behaviorSubject.serviceExternalBehavior(0);
    this.ngOnInit();
  }

}
