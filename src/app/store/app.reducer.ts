
import * as reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';



export interface AppState {
    usuarios: reducers.UsuariosState;
    usuario: reducers.UsuarioState;
    heroes: reducers.HeroesState;
    heroe: reducers.HeroeState;
    auth: reducers.AuthState;

}


export const appReducers: ActionReducerMap<AppState> = {
    usuarios: reducers.usuariosReducer,
    usuario: reducers.usuarioReducer,
    heroes: reducers.heroesReducer,
    heroe: reducers.heroeReducer,
    auth: reducers.authReducer
}