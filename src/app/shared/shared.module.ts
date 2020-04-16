import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AppMaterialModule } from '../app-material.module';
import { FooterComponent } from './footer/footer.component';
import { PagNotFoundComponent } from './pag-not-found/pag-not-found.component';
import { NavDyrcocinasComponent } from './nav-dyrcocinas/nav-dyrcocinas.component';

@NgModule({
  declarations: [
    NavbarComponent, 
    HomeComponent, 
    ErrorComponent, 
    FooterComponent,
    PagNotFoundComponent,
    NavDyrcocinasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule
  ],
  exports:[
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    PagNotFoundComponent,
    NavDyrcocinasComponent
  ]
})
export class SharedModule { }
