import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';

import { ProjectsComponent } from './projects/projects.component';
import { CreateComponent } from './create/create.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TasksComponent } from './tasks/tasks.component';
import { PrivateTasksComponent } from './private-tasks/private-tasks.component';


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
    TasksComponent,
    PrivateTasksComponent
    
  ],
  exports: [
    ProjectsComponent,
    CreateComponent,
    SigninComponent,
    SignupComponent,
    TasksComponent,
    PrivateTasksComponent
  ]
})
export class MeanstackModule { }
