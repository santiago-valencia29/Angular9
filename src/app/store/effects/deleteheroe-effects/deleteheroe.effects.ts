import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as heroeActions from '../../actions';
import { of, Observable } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { HeroesService } from '../../../services/crudfirebase/heroes.service';
import { Action } from '@ngrx/store';

@Injectable()

export class DeleteHeroeEffects {

    constructor(
        private actions$: Actions,
        public heroesService: HeroesService
    ) { }


    @Effect()

    EliminarHeroe$: Observable<Action> = this.actions$
        .pipe(
            ofType(heroeActions.ELIMINAR_HEROE),
            mergeMap(action => {
                const id = action['id']
                return this.heroesService.borrarHeroe(id)
                    .pipe(
                        map(() => new heroeActions.CargarHeroes()),
                        catchError(error => of(new heroeActions.EliminarHeroeFail(error)))
                    );
            })
        );

    @Effect()
    EliminarHeroeUpdateState$: Observable<Action> = this.actions$
        .pipe(
            ofType(heroeActions.ELIMINAR_HEROE),
            mergeMap(action=>{
                const id = action['id']
                return this.heroesService.getHeroe(id)
                .pipe(
                    map((heroe:any) => new heroeActions.CargarHeroeSuccess(heroe)),
                    catchError(error=> of( new heroeActions.CargarHeroeFail(error)))
                )
            })
        );
}