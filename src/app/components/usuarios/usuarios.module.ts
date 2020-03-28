import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListaComponent, 
    UsuarioComponent,
    BehaviorSubjectComponent],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports:[
    ListaComponent, 
    UsuarioComponent,
    BehaviorSubjectComponent
  ]
})
export class UsuariosModule { }
