import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';

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
    CreateComponent
    
  ],
  exports: [
    ProjectsComponent,
    CreateComponent
  ]
})
export class MeanstackModule { }
