import { Action } from '@ngrx/store';



export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] Unset User';


export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user: string) { }

}

export class UnsetUserAction implements Action {
    readonly type = UNSET_USER;

}

export type acciones = SetUserAction | UnsetUserAction;
