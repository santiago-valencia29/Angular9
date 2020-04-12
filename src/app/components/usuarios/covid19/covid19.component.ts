import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Covid19Service } from '../../../services/covid19.service';
import { Casos } from '../../../models/casos.model';
import { coord_muni } from 'src/app/models/coord_muni';
import { environment } from '../../../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit,AfterViewInit {


  active = 1;
  clock = new Date();
  casos: any = [];
  recuperados: number = 0;
  fallecidos: number = 0;
  activos: number = 0;

  loading: boolean;

  coordinates = [];

  mapa: Mapboxgl.Map;
  @ViewChild('mapElement') mapElement: ElementRef;

  constructor(private _Covid19Service: Covid19Service) {
  }


  ngOnInit(): void {

   
    this._Covid19Service.getDataCovid().subscribe((data: Casos) => {
      if (data) {
        this.loading = true;
        this.casos = data;
        this.getQuery();
        this.asignCoord();
      }
    },
      error => {
        console.log(<any>error)
        this.loading = false;
      });

      Mapboxgl.accessToken = environment.mapboxkey;
      

  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.mapa = new Mapboxgl.Map({
        container: this.mapElement.nativeElement, // container id
        style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
        center: [-74.2973328, 4.570868], // starting position [lng, lat]
        zoom: 4.5 // starting zoom
      });
    }, 800);
   
  }


  getQuery() {
    this.casos.forEach((campo: Casos) => {
      if (campo.atenci_n === 'Recuperado') {
        this.recuperados++
      }
      if (campo.atenci_n === 'Fallecido') {
        this.fallecidos++
      }
      if (campo.atenci_n !== 'Recuperado' && campo.atenci_n !== 'Fallecido') {
        this.activos++
      }

    });

  }

  asignCoord() {
    for (let x in coord_muni) {
      for (let i in this.casos) {
        if (this.casos[i].ciudad_de_ubicaci_n.includes(coord_muni[x].municipio)) {

          this.coordinates.push(
            {
              'title': this.casos[i].ciudad_de_ubicaci_n,
              'coordinates': [parseFloat(coord_muni[x].Longitud), parseFloat(coord_muni[x].Latitud)]
            })
        }
      }
    }
    // eliminar duplicados de un array
    // console.log("esta es la data", this.coordinates)

    this.coordinates = Array.from(new Set(this.coordinates.map(campo => campo.title)))
      .map(title => {
        return {
          title: title,
          coordinates: this.coordinates.find(campo => campo.title === title).coordinates
        };
      });

    console.log(this.coordinates)

  }
}


