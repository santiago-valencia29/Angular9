import { Action } from "@ngrx/store";
import { HeroeModel } from '../../../models/heroe.model';


export const CARGAR_HEROES = '[Heroes] Cargar Heroes';
export const CARGAR_HEROES_FAIL = '[Heroes] Cargar Heroes FAIL';
export const CARGAR_HEROES_SUCCESS = '[Heroes] Cargar Heroes SUCCESS';

export class CargarHeroes implements Action{
    readonly type = CARGAR_HEROES;
}

export class CargarHeroesFail implements Action{
    readonly type = CARGAR_HEROES_FAIL;

    constructor(public payload:any){}
}

export class CargarHeroesSuccess implements Action{
    readonly type = CARGAR_HEROES_SUCCESS;

    constructor(public heroes:HeroeModel[]){}
}

export type heroesAcciones= CargarHeroes|
                            CargarHeroesFail|
                            CargarHeroesSuccess;
