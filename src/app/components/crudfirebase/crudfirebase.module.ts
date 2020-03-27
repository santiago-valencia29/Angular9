import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { HeroeComponent } from './heroe/heroe.component';
import { HeroesComponent } from './heroes/heroes.component';




@NgModule({
  declarations: [
    HeroeComponent,
    HeroesComponent],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbPaginationModule
  ],
  exports: [
    HeroeComponent,
    HeroesComponent
  ]
})
export class CrudfirebaseModule { }
