import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../models/auth/usuario.model';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { SetUserAction } from 'src/app/store/actions';
import { UnsetUserAction } from '../../store/actions/auth-actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyCL9AJwU9ZRWLFQCxX86e30xbp5C9TYWaA';

  userToken: string;

  // Crear Usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(private http: HttpClient,
              private store: Store<AppState>) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
  }

  login(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      // email: usuario.email,
      // password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/accounts:signInWithPassword?key=${this.apikey}`, authData)
      .pipe(
        map(resp => {
          this.store.dispatch(new SetUserAction(resp['email']));
          this.guardarToken(resp['idToken'], resp['email']);
          return resp;
        })
      );
  }

  nuevoUsuario(usuario: UsuarioModel) {

    const authData = {
      // ...usuario
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/accounts:signUp?key=${this.apikey}`, authData)
      .pipe(
        map(resp => {
          this.store.dispatch(new SetUserAction(resp['email']));
          this.guardarToken(resp['idToken'], resp['email']);
          return resp;
        })
      );

  }


  private guardarToken(idToken: string, email: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    localStorage.setItem('user', email);


    // obtener cuando se expira el token
    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());

  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');

    } else {
      this.userToken = '';
    }
  }

  estaAutenticado(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }

  }



}
