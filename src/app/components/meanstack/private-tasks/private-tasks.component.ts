import { Component, OnInit, ViewChild } from '@angular/core';

import { Papa } from 'ngx-papaparse';

import { Crm } from '../../../models/crm.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  @ViewChild('stepper') stepper;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;



  fields: [];
  dataFile: any;
  strFile: any;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;

  constructor(private papa: Papa, private _formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      separator: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      file: ['', Validators.required]
    });

  }

  reset() {
    this.fields = [];
    this.stepper.reset();
  }


  parseo(data) {
    let csvData = data;
    let options = {
      delimiter: this.firstFormGroup.value.separator,
      header: true,
      complete: (results) => {
        console.log('Parsed: ', results);
        this.fields = results.meta.fields;
        if (this.fields.length <= 1) {
          Swal.fire({
            title: 'Error',
            text: 'formato separador no concuerda con el archivo plano.',
            icon: 'error',
            confirmButtonColor: '#073642',
          })
          this.reset();
          return
        }
        this.dataFile = results.data;
      }
    };
    this.papa.parse(csvData, options);
  }

  openFile(event) {
    //obtener file
    let input = event.target;
    //recorrer file y cargarlo
    for (var index = 0; index < input.files.length; index++) {
      let reader = new FileReader();
      reader.onload = () => {
        //  'data' esta el con tenido dela archivo
        var data = reader.result;
        this.strFile = data;
        //obtener encabezado
        this.parseo(data);
      }
      //para leer contenido del file
      reader.readAsText(input.files[index]);
    };
  }

  save(form: NgForm) {
    //valid form
    if (form.invalid) {
      Swal.fire({
        text: 'Hay campos que faltan por completar',
        icon: 'warning',
        confirmButtonColor: '#073642',
      })
      return;
    }

    //obtener nombres de campos para almacenar
    let data = Object.values(form.value);

    //valid duplicates
    if (this.fieldsDuplicate(data)) {
      return
    }

    //editar nombre de propiedades(columnas) para la carga
    this.strFile = this.strFile.replace(form.value.nombre, "nombre");
    this.strFile = this.strFile.replace(form.value.apellido, "apellido");
    this.strFile = this.strFile.replace(form.value.telefono, "telefono");
    this.strFile = this.strFile.replace(form.value.direccion, "direccion");

    //dar formato json a strFile(archivo plano)
    this.parseo(this.strFile)

    //seleccionar columnas a cargar
    var dataSave = this.dataFile.map(item => {
      return { nombre: item.nombre, apellido: item.apellido, telefono: item.telefono, direccion: item.direccion };
    });
    console.log(dataSave)

    form.resetForm();
    this.reset();

  }

  fieldsDuplicate(data): boolean {
    var repetidos = [];
    var temporal = [];

    data.forEach((value, index) => {
      //Copiado de elemento
      temporal = Object.assign([], data);
      temporal.splice(index, 1); //Se elimina el elemento q se compara
      /**
       * Se busca en temporal el elemento, y en repetido para
       * ver si esta ingresado al array. indexOf retorna
       * -1 si el elemento no se encuetra
       **/
      if (temporal.indexOf(value) != -1 && repetidos.indexOf(value) == -1) repetidos.push(value);
    });
    if (repetidos.length > 0) {
      Swal.fire({
        text: 'Hay campos duplicados: ' + repetidos,
        icon: 'warning',
        confirmButtonColor: '#073642',
      })
      return true;
    }
  }
}


