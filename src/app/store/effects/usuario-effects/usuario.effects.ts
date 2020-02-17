import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as usuarioActions from '../../actions';
import { of, Observable } from 'rxjs';
import { map, catchError, mergeMap } from "rxjs/operators";
import { UsuarioService } from '../../../services/usuario.service';
import { Action } from '@ngrx/store';

@Injectable()

export class UsuarioEffects {

    constructor(
            private actions$:Actions,
            public usuariosService:UsuarioService
    ){}


    @Effect()

    cargarUsuario$:Observable<Action>=this.actions$
    .pipe(
          ofType(usuarioActions.CARGAR_USUARIO),
            mergeMap(action=>{
                const id = action['id']
                return this.usuariosService.getUserById(id)
                .pipe(
                    map((user:any) => new usuarioActions.CargarUsuarioSuccess(user)),
                    catchError(error=> of( new usuarioActions.CargarUsuarioFail(error)))
                )
            })
    )
}