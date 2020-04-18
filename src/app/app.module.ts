// Modulos
import { AppRoutingModule } from './app-routing.module';
import { UsuariosModule } from './components/usuarios/usuarios.module';
import { CrudfirebaseModule } from './components/crudfirebase/crudfirebase.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { MeanstackModule } from './components/meanstack/meanstack.module';
import { DyrcocinasModule } from './components/dyrcocinas/dyrcocinas.module';


import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// conect service http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './store/app.reducer';
import { effectsArr } from './store/effects/index';


import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeEsCo from '@angular/common/locales/es-CO';

registerLocaleData(localeEsCo, 'es-CO');

import { Mugan86GoogleAnalyticsModule } from 'mugan86-ng-google-analytics';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: false,
      }
    }),
    EffectsModule.forRoot(effectsArr),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    SharedModule,
    UsuariosModule,
    CrudfirebaseModule,
    AuthModule,
    MeanstackModule,
    BrowserAnimationsModule,
    DyrcocinasModule,
    Mugan86GoogleAnalyticsModule.forRoot(
      {
        analyticsId: 'UA-157504171-1',
        showLog: true
      }
    )
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' },Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
