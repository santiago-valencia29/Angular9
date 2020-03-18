import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroeComponent } from './heroe/heroe.component';
import { HeroesComponent } from './heroes/heroes.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';




@NgModule({
  declarations: [
    HeroeComponent,
    HeroesComponent],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AppMaterialModule
  ],
  exports: [
    HeroeComponent,
    HeroesComponent
  ]
})
export class CrudfirebaseModule { }
