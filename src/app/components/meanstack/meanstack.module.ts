import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { CreateComponent } from './create/create.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProjectsComponent,
    CreateComponent,
    ContactComponent
  ],
  exports: [
    ProjectsComponent,
    CreateComponent,
    ContactComponent
  ]
})
export class MeanstackModule { }
