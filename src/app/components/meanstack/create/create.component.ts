import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { ProjectService } from '../../../services/meanstack/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // thirdFormGroup: FormGroup;

  titulo: string;
  project: Project;

  constructor(private _formBuilder: FormBuilder, private _projectService: ProjectService
    
  ) {
    this.titulo = "Crear Proyecto";
   }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
  
    });
   
   
    this.secondFormGroup = this._formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(100)]],
      category: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(25)]], 
      year: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(4),Validators.pattern("^[0-9]*$")]],
      langs: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(25)]],
      image: ['', Validators.required]
    });
  }

  onSubmit(){
    this.project = this.secondFormGroup.value
    console.log(this.project)
    // console.log(this.secondFormGroup)
    if (this.secondFormGroup.invalid) {
      Swal.fire({
        text: 'Hay campos sin completar',
        icon: 'info'
      })
      this.secondFormGroup.reset();
      return;
    }
    this._projectService.saveProject(this.project).subscribe(
      response =>{
        if(response.project){
          this.secondFormGroup.reset();
          Swal.fire({
            text: 'El Projecto se ha guardado correctamente',
            icon: 'success'
          })
 
        } else {
          Swal.fire({
            text: 'Hubo un error guardando el proyecto',
            icon: 'error'
          })
        }
      },
      error => {
        Swal.fire({
          text: 'Hubo un error guardando el proyecto',
          icon: 'error'
        })
        console.log(<any>error)
      }
    )

    
  }



}
