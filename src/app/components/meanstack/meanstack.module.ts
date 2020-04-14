import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';

import { ProjectsComponent, ModalDialog } from './projects/projects.component';
import { CreateComponent } from './create/create.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PrivateTasksComponent } from './private-tasks/private-tasks.component';
import { GalleryModule } from  '@ngx-gallery/core';
import { GALLERY_CONFIG } from '@ngx-gallery/core';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { tokenService } from 'src/app/services/meanstack/token.service';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    GalleryModule
       
  ],
  declarations: [
    ProjectsComponent,
    CreateComponent,
    SigninComponent,
    SignupComponent,
    PrivateTasksComponent,
    ModalDialog

    
  ],
  exports: [
    ProjectsComponent,
    CreateComponent,
    SigninComponent,
    SignupComponent,
    PrivateTasksComponent,
    ModalDialog
  ],
  entryComponents:[ProjectsComponent,ModalDialog],
  providers:[{
    provide: GALLERY_CONFIG,
    useValue: {
      dots: true,
      imageSize: 'cover'
    }
  }]

  // ],
  // providers:[{
  //   provide: HTTP_INTERCEPTORS, // permite agregar header autorization con el token verifyToken en node js
  //   useClass: tokenService,
  //   multi: true
  // }]
})
export class MeanstackModule { }
