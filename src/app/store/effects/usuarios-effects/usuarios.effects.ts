import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as usuariosActions from '../../actions';
import { of, Observable } from 'rxjs';
import { map, catchError, mergeMap } from "rxjs/operators";
import { UsuarioService } from '../../../services/usuario.service';
import { Action } from '@ngrx/store';

@Injectable()

export class UsuariosEffects {

    constructor(
            private actions$:Actions,
            public usuariosService:UsuarioService
    ){}


    @Effect()

    cargarUsuarios$:Observable<Action>=this.actions$
    .pipe(
          ofType(usuariosActions.CARGAR_USUARIOS),
            mergeMap(action=>{
                return this.usuariosService.getUsers()
                .pipe(
                    map((users:any) => new usuariosActions.CargarUsuariosSuccess(users)),
                    catchError(error=> of( new usuariosActions.CargarUsuariosFail(error)))
                )
            })
    )
}