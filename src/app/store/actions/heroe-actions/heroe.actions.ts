import { Action } from "@ngrx/store";
import { HeroeModel } from '../../../models/heroe.model';

export const CARGAR_HEROE = '[Heroe] Cargar Heroe';
export const ELIMINAR_HEROE = '[Heroe] Eliminar Heroe';
export const ELIMINAR_HEROE_FAIL = '[Heroe] Eliminar Heroe FAIL';
export const CARGAR_HEROE_FAIL = '[Heroe] Cargar Heroe FAIL';
export const CARGAR_HEROE_SUCCESS = '[Heroe] Cargar Heroe SUCCESS';

export class CargarHeroe implements Action{
    readonly type = CARGAR_HEROE;

    constructor(public id:string){

    }
}

export class EliminarHeroe implements Action{
    readonly type = ELIMINAR_HEROE;

    constructor(public id:string){

    }
}

export class EliminarHeroeFail implements Action{
    readonly type = ELIMINAR_HEROE_FAIL;

    constructor(public payload:any){}
}


export class CargarHeroeFail implements Action{
    readonly type = CARGAR_HEROE_FAIL;

    constructor(public payload:any){}
}

export class CargarHeroeSuccess implements Action{
    readonly type = CARGAR_HEROE_SUCCESS;

    constructor(public heroe:HeroeModel){}
}

export type heroeAcciones= CargarHeroe|
                            EliminarHeroe|
                            EliminarHeroeFail|
                            CargarHeroeFail|
                            CargarHeroeSuccess;
