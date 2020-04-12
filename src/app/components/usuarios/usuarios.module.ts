import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { RouterModule } from '@angular/router';
import { Covid19Component } from './covid19/covid19.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
    ListaComponent, 
    UsuarioComponent,
    BehaviorSubjectComponent,
    Covid19Component
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports:[
    ListaComponent, 
    UsuarioComponent,
    BehaviorSubjectComponent,
    Covid19Component
  ]
})
export class UsuariosModule { }
