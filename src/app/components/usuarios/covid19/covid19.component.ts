import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {timer} from 'rxjs';


@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {

  active = 1;
  clock

  constructor() {
    this.clock = timer(0,10).subscribe(tick =>{
      this.clock=new Date();
    });
    

   }
  ngOnInit(): void {

    
  }

}
