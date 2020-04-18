import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn } from 'ng-animate';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('zoomIn', [transition('* => *', useAnimation(zoomIn))])
  ]
})
export class AppComponent {

  public constructor(private titleService: Title) { 
    this.titleService.setTitle( 'My APP' );
  }


  
}


