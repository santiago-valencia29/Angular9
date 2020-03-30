import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeOut } from 'ng-animate';
import { HeroesService } from '../../../services/crudfirebase/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import * as heroesActions from '../../../store/actions'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import Swal from 'sweetalert2';
import { BehaviorSubjectService } from 'src/app/services/behavior-subject.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  animations: [
    trigger('fadeOut', [transition('* => *', useAnimation(fadeOut))])
  ]

  
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[]=[]
  
  loading: boolean
  error: any

  pageSize = 4;
  page = 1;


  constructor(private heroesService:HeroesService,private _behaviorSubject:BehaviorSubjectService,
              private store:Store<AppState>) { }

  ngOnInit() {

    this.store.dispatch(new heroesActions.CargarHeroes());

    this.store.select('heroes')
      .subscribe(heroes=>{
        
        this.loading=heroes.loading;
        this.error=heroes.error;
        this.heroes=heroes.heroes;

        this._behaviorSubject.serviceExternalBehavior(this.heroes);

        if(this.error){
          Swal.fire({
            title:'Error',
            text: this.error.message,
            icon: 'error'
          })
        }
      
      });

    //SIN REDUX
    // this.cargando = true;
    // this.heroesService.getHeroes()
    // .subscribe(resp=>{
    
    //   this.heroes = resp
    //   console.log(this.heroes)
    //   this.cargando = false
    // })
 
  }



  borrarHeroe(heroe:HeroeModel){
  
    Swal.fire({
      title:'¿Está seguro?',
      text:`Está seguro que desea borrar a ${heroe.nombre}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if (resp.value){
        
        this.store.dispatch(new heroesActions.EliminarHeroe(heroe.id));

        this.store.select('heroe')
        .subscribe(resp=>{
          this.error=resp.error
          if(this.error){
            Swal.fire({
              title:'Error',
              text: this.error.message,
              icon: 'error'
            })
          }
        });


        //SIN REDUX
        // this.heroesService.borrarHeroe(heroe.id).subscribe()
        // setTimeout(() => {
        //   this.ngOnInit()
        // }, 200);
      }
      
    })

   

  }

}
