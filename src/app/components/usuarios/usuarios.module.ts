import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { Covid19Component } from './covid19/covid19.component';

import { AreaChartComponent } from './covid19/graficas/area-chart/area-chart.component';
import { PieChartAdvanceComponent } from './covid19/graficas/pie-chart-advance/pie-chart-advance.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    ListaComponent, 
    UsuarioComponent,
    BehaviorSubjectComponent,
    Covid19Component,
    AreaChartComponent,
    PieChartAdvanceComponent
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    NgxChartsModule
  ],
  
  exports:[
    ListaComponent, 
    UsuarioComponent,
    BehaviorSubjectComponent,
    Covid19Component,
    AreaChartComponent,
    PieChartAdvanceComponent
  ]
})
export class UsuariosModule { }
