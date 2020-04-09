import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../../../services/covid19.service';
import { Casos } from '../../../models/casos.model';



@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {

  active = 1;
  clock = new Date();
  casos:any = [];
  recuperados:number=0;
  fallecidos:number=0;
  activos:number=0;

  loading: boolean;

  constructor(private _Covid19Service: Covid19Service) {
   }
  ngOnInit(): void {
     this._Covid19Service.getDataCovid().subscribe((data:Casos)=>{
       if(data){
        this.loading = true;
        this.casos= data;
        this.getQuery();
       } 
    },
     error => {
        console.log(<any>error)

        this.loading = false;
      });
   
  }
 
  getQuery(){
    this.casos.forEach((campo:Casos) => {
      if(campo.atenci_n==='Recuperado'){
       this.recuperados++
      }
      if(campo.atenci_n==='Fallecido'){
        this.fallecidos++
      }
      if(campo.atenci_n!=='Recuperado'&& campo.atenci_n!=='Fallecido'){
        this.activos++
      }
     
    });
    
  }

}
