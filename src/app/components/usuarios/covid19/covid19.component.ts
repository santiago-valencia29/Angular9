import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../../../services/covid19.service';
import { Casos } from '../../../models/casos.model';
import { coord_muni } from 'src/app/models/coord_muni';
import { environment } from '../../../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { NgxChartsModule } from '@swimlane/ngx-charts';




@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {


  active = 1;
  clock = new Date();
  casos: any = [];
  recuperados: number = 0;
  fallecidos: number = 0;
  activos: number = 0;

  loading: boolean;

  coordinates = [];

  mapa: Mapboxgl.Map;


  constructor(private _Covid19Service: Covid19Service) {

  }


  ngOnInit(): void {

    this._Covid19Service.getDataCovid().subscribe((data: Casos) => {
      if (data) {
        this.loading = true;
        this.casos = data;
        this.addMap();
        this.getQueryResumen();
        this.asignCoord();
        this.getDataMarker();
        this.addMarkers();

      }
    },
      error => {
        console.log(<any>error)
        this.loading = false;
      });

  }

  getDataMarker() {

    var repetidos = {};

    this.casos.forEach(function (campo) {
      repetidos[campo.ciudad_de_ubicaci_n] = (repetidos[campo.ciudad_de_ubicaci_n] || 0) + 1;
    });


    for (let i in this.coordinates) {
      for (let key in repetidos) {
        if (this.coordinates[i].title.includes(key)) {
         this.coordinates[i]['numCasos'] = repetidos[key]
        }
      }
    }
  }

  addMap() {
    Mapboxgl.accessToken = environment.mapboxkey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
      center: [-74.2973328, 4.570868], // starting position [lng, lat]
      zoom: 4.5 // starting zoom    
    });
  }

  addMarkers() {
    for (let i in this.coordinates) {

      var popup = new Mapboxgl.Popup({ offset: 25 }).setText(
        
        "Municipio: "+ this.coordinates[i].title + "\n,"+
        "Casos Aproximados: "+this.coordinates[i].numCasos
        );

      var el = document.createElement('div');

      el.style.backgroundImage = 'url("/assets/images/images_santiago/virus.svg")';
      el.style.width = '15px';
      el.style.height = '15px';

      new Mapboxgl.Marker(el).setLngLat(this.coordinates[i].coordinates).setPopup(popup).addTo(this.mapa);
    }
  }

  getQueryResumen() {
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
  }
}


