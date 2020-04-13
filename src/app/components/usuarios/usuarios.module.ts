import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { RouterModule } from '@angular/router';
import { Covid19Component } from './covid19/covid19.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AreaChartComponent } from './covid19/graficas/area-chart/area-chart.component';





@NgModule({
  declarations: [
    ListaComponent, 
    UsuarioComponent,
    BehaviorSubjectComponent,
    Covid19Component,
    AreaChartComponent
  
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
    AreaChartComponent
  ]
})
export class UsuariosModule { }
