import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../../../services/covid19.service';
import { Casos } from '../../../models/casos.model';
import { coord_muni } from 'src/app/models/coord_muni';
import { environment } from '../../../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { BehaviorSubjectService } from 'src/app/services/behavior-subject.service';
import Swal from 'sweetalert2';
import { GoogleAnalyticsService } from 'mugan86-ng-google-analytics';
import { Title } from '@angular/platform-browser';


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
  showPieChart: boolean;
  loading: boolean;
  coordinates = [];
  mapa: Mapboxgl.Map;
  showpie = true;
  anio = new Date().getFullYear();


  constructor(private titleService: Title,public googleAnalyticsService: GoogleAnalyticsService,private _behaviorSubject: BehaviorSubjectService, private _Covid19Service: Covid19Service) {
    this.titleService.setTitle( 'Covid19 Colombia' );
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
        this.sendDataAreaChart();
        this.sendDataAreaMuni();
        this.sendDataLineChart();
        this.sendDataCakePieCasosEdad();

      }
    },
      error => {
        console.log(<any>error)
        this.loading = false;
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: error.message,
          showConfirmButton: false,
          allowOutsideClick:false
        });
      });

  }
  //******** */
  analyticsEventVerPorcentajes() {
    // We call the event emmiter function from our service and pass in the details
    this.googleAnalyticsService.eventEmitter('Resumen Covid', 'Clic boton', 'Ver porcentajes', 1);
  }

  analyticsEventDiagnostico(){
    this.googleAnalyticsService.eventEmitter('Diagnostico Covid', 'Clic item Nav', 'Pag Diagnostico', 1);
  }

  analyticsEventPieChart(){
    this.googleAnalyticsService.eventEmitter('Diagnostico Covid', 'Clic boton Fallecimiento', 'Data Fallecimiento', 1);
  }

  sendDataCakePieFalleEdad() {
    this.showpie = false
    setTimeout(() => {
      this.showpie = true
      let single = []
      let edad1 = 0, edad2 = 0, edad3 = 0, edad4 = 0, edad5 = 0, edad6 = 0, edad7 = 0, edad8 = 0
      for (let i in this.casos) {
        if (this.casos[i].edad > 0 && this.casos[i].edad < 10 && this.casos[i].atenci_n === 'Fallecido') {
          edad1++
          single[0] = { "name": "0-9", "value": edad1 }
        } else
          if (this.casos[i].edad > 9 && this.casos[i].edad < 20 && this.casos[i].atenci_n === 'Fallecido') {
            edad2++
            single[1] = { "name": "10-19", "value": edad2 }
          } else
            if (this.casos[i].edad > 19 && this.casos[i].edad < 30 && this.casos[i].atenci_n === 'Fallecido') {
              edad3++
              single[2] = { "name": "20-29", "value": edad3 }
            } else
              if (this.casos[i].edad > 29 && this.casos[i].edad < 40 && this.casos[i].atenci_n === 'Fallecido') {
                edad4++
                single[3] = { "name": "30-39", "value": edad4 }
              } else
                if (this.casos[i].edad > 39 && this.casos[i].edad < 50 && this.casos[i].atenci_n === 'Fallecido') {
                  edad5++
                  single[4] = { "name": "40-49", "value": edad5 }
                } else
                  if (this.casos[i].edad > 49 && this.casos[i].edad < 60 && this.casos[i].atenci_n === 'Fallecido') {
                    edad6++
                    single[5] = { "name": "50-59", "value": edad6 }
                  } else
                    if (this.casos[i].edad > 59 && this.casos[i].edad < 70 && this.casos[i].atenci_n === 'Fallecido') {
                      edad7++
                      single[6] = { "name": "60-69", "value": edad7 }
                    } else
                      if (this.casos[i].edad > 60 && this.casos[i].atenci_n === 'Fallecido') {
                        edad8++
                        single[7] = { "name": ">70", "value": edad8 }
                      }
      }
      this._behaviorSubject.serviceExternalCake(single);
    }, 200);


  }

  sendDataCakePieCasosEdad() {
    this.showpie = false;

    setTimeout(() => {
      this.showpie = true;
      let single = []
      let edad1 = 0, edad2 = 0, edad3 = 0, edad4 = 0, edad5 = 0, edad6 = 0, edad7 = 0, edad8 = 0
      for (let i in this.casos) {
        if (this.casos[i].edad > 0 && this.casos[i].edad < 10) {
          edad1++
          single[0] = { "name": "0-9", "value": edad1 }
        } else
          if (this.casos[i].edad > 9 && this.casos[i].edad < 20) {
            edad2++
            single[1] = { "name": "10-19", "value": edad2 }
          } else
            if (this.casos[i].edad > 19 && this.casos[i].edad < 30) {
              edad3++
              single[2] = { "name": "20-29", "value": edad3 }
            } else
              if (this.casos[i].edad > 29 && this.casos[i].edad < 40) {
                edad4++
                single[3] = { "name": "30-39", "value": edad4 }
              } else
                if (this.casos[i].edad > 39 && this.casos[i].edad < 50) {
                  edad5++
                  single[4] = { "name": "40-49", "value": edad5 }
                } else
                  if (this.casos[i].edad > 49 && this.casos[i].edad < 60) {
                    edad6++
                    single[5] = { "name": "50-59", "value": edad6 }
                  } else
                    if (this.casos[i].edad > 59 && this.casos[i].edad < 70) {
                      edad7++
                      single[6] = { "name": "60-69", "value": edad7 }
                    } else
                      if (this.casos[i].edad > 60) {
                        edad8++
                        single[7] = { "name": ">70", "value": edad8 }
                      }


      }
      this._behaviorSubject.serviceExternalCake(single);
    }, 300);

  }

  sendDataLineChart() {
    let multi = [
      {
        "name": "Fallecidos",
        "series": []
      }
    ]
    let repetidos = {};
    for (let i in this.casos) {
      if (this.casos[i].atenci_n === "Fallecido") {
        repetidos[this.casos[i].fecha_de_notificaci_n] = (repetidos[this.casos[i].fecha_de_notificaci_n] || 0) + 1;
      }

    }

    for (let x in repetidos) {

      let fecha = new Date(x).toLocaleDateString();
      if(fecha!=='Invalid Date'){
      multi[0]['series'].push(
        {
          "name": fecha,
          "value": repetidos[x]

        })
      }
    }
    this._behaviorSubject.serviceExternalLineChart(multi);
  }

  sendDataAreaMuni() {
    let multi = [
      {
        "name": "Casos por Municipios",
        "series": []
      }
    ]
    let repetidos = {};
    for (let i in this.casos) {
      repetidos[this.casos[i].ciudad_de_ubicaci_n] = (repetidos[this.casos[i].ciudad_de_ubicaci_n] || 0) + 1;
    }

    for (let x in repetidos) {

      //console.log(x) para controlar las fechas que vienen erradas pendiente
      multi[0]['series'].push(
        {
          "name": x,
          "value": repetidos[x]

        })
    }
    this._behaviorSubject.serviceExternalAreaMuniChart(multi);
  }

  sendDataAreaChart() {

  
    let multi = [
      {
        "name": "Casos reportados por día",
        "series": []
      }
    ]
    let repetidos = {};
    for (let i in this.casos) {
      if (this.casos[i].atenci_n !== "Recuperado" && this.casos[i].atenci_n !== "Fallecido") {
        repetidos[this.casos[i].fecha_de_notificaci_n] = (repetidos[this.casos[i].fecha_de_notificaci_n] || 0) + 1;
      }

    }

    for (let x in repetidos) {

      
      let fecha = new Date(x).toLocaleDateString();
      if(fecha!=='Invalid Date'){
        multi[0]['series'].push(
          {
            "name": fecha,
            "value": repetidos[x]
  
          })
      }
     
    }
    this._behaviorSubject.serviceExternalAreaChart(multi);
  }

  getDataMarker() {

    let repetidos = {};

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
    },err =>{
      Swal.fire({
        title: 'Error al cargar el mapa',
        icon: 'error',
        text: err
      });
    
    });
   
  }

  addMarkers() {
    for (let i in this.coordinates) {

      var popup = new Mapboxgl.Popup({ offset: 25 }).setText(

        "Municipio: " + this.coordinates[i].title + "\n," +
        "Casos Aproximados: " + this.coordinates[i].numCasos
      );

      var el = document.createElement('div');

      el.style.backgroundImage = 'url("/assets/images/images_santiago/virus.svg")';
      el.style.width = '15px';
      el.style.height = '15px';

      new Mapboxgl.Marker(el).setLngLat(this.coordinates[i].coordinates).setPopup(popup).addTo(this.mapa);
    }
  }

  getQueryResumen() {
    let aislados = 0;
    let hospital = 0;
    let hospitalUci = 0;

    this.casos.forEach((campo: Casos) => {
      if (campo)
        if (campo.atenci_n === 'Recuperado') {
          this.recuperados++
        }
      if (campo.atenci_n === 'Fallecido') {
        this.fallecidos++
      }
      if (campo.atenci_n !== 'Recuperado' && campo.atenci_n !== 'Fallecido') {
        this.activos++
      }
      if (campo.atenci_n === 'Casa') {
        aislados++
      }
      if (campo.atenci_n === 'Hospital') {
        hospital++
      }
      if (campo.atenci_n === 'Hospital UCI') {
        hospitalUci++
      }

    });

    let dataBarChart = [
      {
        "name": "Recuperados",
        "value": this.recuperados
      },
      {
        "name": "Aislados",
        "value": aislados
      },
      {
        "name": "Hospital",
        "value": hospital
      },
      {
        "name": "Hospital UCI",
        "value": hospitalUci
      },
      {
        "name": "Fallecidos",
        "value": this.fallecidos
      }

    ]
    this._behaviorSubject.serviceExternalBarChart(dataBarChart);


    let dataPiechart = [
      {
        "name": "Recuperados",
        "value": this.recuperados
      },
      {
        "name": "Fallecidos",
        "value": this.fallecidos
      },
      {
        "name": "Activos",
        "value": this.activos
      }
    ]
    this._behaviorSubject.serviceExternalPieChart(dataPiechart);
  }

  MaysPrimera(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  asignCoord() {
    for (let x in coord_muni) {
      for (let i in this.casos) {
        if (this.casos[i].codigo_divipola===coord_muni[x].muni) {


          this.coordinates.push(
            {
              'title': this.casos[i].ciudad_de_ubicaci_n,
              'coordinates': [parseFloat(coord_muni[x].longitud), parseFloat(coord_muni[x].latitud)]
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



