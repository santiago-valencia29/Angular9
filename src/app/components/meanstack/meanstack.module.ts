import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';

import { ProjectsComponent } from './projects/projects.component';
import { CreateComponent } from './create/create.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PrivateTasksComponent } from './private-tasks/private-tasks.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenService } from 'src/app/services/meanstack/token.service';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule 
  ],
  declarations: [
    ProjectsComponent,
    CreateComponent,
    SigninComponent,
    SignupComponent,
    PrivateTasksComponent
    
  ],
  exports: [
    ProjectsComponent,
    CreateComponent,
    SigninComponent,
    SignupComponent,
    PrivateTasksComponent
  ]
  // ],
  // providers:[{
  //   provide: HTTP_INTERCEPTORS, // permite agregar header autorization con el token verifyToken en node js
  //   useClass: tokenService,
  //   multi: true
  // }]
})
export class MeanstackModule { }
