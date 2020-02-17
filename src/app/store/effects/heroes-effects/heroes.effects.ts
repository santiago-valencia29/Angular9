import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as heroesActions from '../../actions';
import { of, Observable } from 'rxjs';
import { map, catchError, mergeMap } from "rxjs/operators";
import { HeroesService } from '../../../services/crudfirebase/heroes.service';
import { Action } from '@ngrx/store';

@Injectable()

export class HeroesEffects {

    constructor(
            private actions$:Actions,
            public heroesService:HeroesService
    ){}


    @Effect()

    cargarHeroes$:Observable<Action>=this.actions$
    .pipe(
          ofType(heroesActions.CARGAR_HEROES),
            mergeMap(action=>{
                return this.heroesService.getHeroes()
                .pipe(
                    map((heroes:any) => new heroesActions.CargarHeroesSuccess(heroes)),
                    catchError(error=> of( new heroesActions.CargarHeroesFail(error)))
                )
            })
    )
}