import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateComponent } from './create/create.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent
  ],
  exports: [
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent
  ]
})
export class MeanstackModule { }
