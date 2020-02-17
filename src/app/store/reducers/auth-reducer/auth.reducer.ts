import * as fromAuth from '../../actions/auth-actions/auth.actions';

export interface AuthState{
    user: string;
}

const estadoInicial: AuthState = {
    user: null
};

export function authReducer(state = estadoInicial, action: fromAuth.acciones): AuthState {

    switch (action.type) {

        case fromAuth.SET_USER:
          return  {
            user: action.user
          };

        case fromAuth.UNSET_USER:
        return  {
            user: null
          };


        default:
            return state;
    }
}