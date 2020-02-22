import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { HeroeModel } from '../../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../../services/crudfirebase/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as heroeActions from '../../../store/actions'
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ]
})
export class HeroeComponent implements OnInit {

  showbuttonnew = false;
  loading: boolean;
  error: any;
  heroe = new HeroeModel();


  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {

      this.store.dispatch(new heroeActions.CargarHeroe(id));

      this.store.select('heroe')
        .subscribe(heroe => {

          this.loading = heroe.loading;
          this.error = heroe.error;
          if (heroe.heroe) {
            this.heroe = Object.assign({}, heroe.heroe);
            this.heroe.id = id;
          }


        });

      this.showbuttonnew = true;
    } else {
      this.showbuttonnew = false;
    }


    // SIN REDUX
    // if(id!=='nuevo' ){
    //   this.heroesService.getHeroe(id)
    //   .subscribe((resp:HeroeModel)=>{
    //     this.heroe = resp
    //     this.heroe.id = id
    //     // console.log(resp)
    //   })
    //   this.showbuttonnew = true
    // }else{
    //   this.showbuttonnew = false
    // }
  }

  guardar(form: NgForm) {
    // console.log(form)
    // console.log(this.heroe)
    if (form.invalid) {
      Swal.fire({
        text: 'Hay Campos que faltan por llenar',
        icon: 'info'
      })
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })

    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      })

    })

    this.showbuttonnew = true;



  }

  nuevo() {
    this.showbuttonnew = false;
    this.heroe.id = null;
    this.heroe.nombre = null;
    this.heroe.poder = null;
  }

}
