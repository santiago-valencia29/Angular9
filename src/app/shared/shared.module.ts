import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AppMaterialModule } from '../app-material.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent, 
    HomeComponent, 
    ErrorComponent, 
    FooterComponent
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
    ErrorComponent
  ]
})
export class SharedModule { }
