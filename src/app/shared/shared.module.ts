import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, ErrorComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class SharedModule { }
