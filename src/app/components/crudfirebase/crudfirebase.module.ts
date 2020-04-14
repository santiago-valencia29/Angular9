import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { HeroeComponent } from './heroe/heroe.component';
import { HeroesComponent } from './heroes/heroes.component';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  declarations: [
    HeroeComponent,
    HeroesComponent],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbPaginationModule,
    SharedModule
  ],
  exports: [
    HeroeComponent,
    HeroesComponent
  ]
})
export class CrudfirebaseModule { }
