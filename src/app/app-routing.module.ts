import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Redux
import { ListaComponent } from './components/usuarios/lista/lista.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
// Home
import { HomeComponent } from './shared/home/home.component';
// CrudFirebase
import { HeroesComponent } from './components/crudfirebase/heroes/heroes.component';
import { HeroeComponent } from './components/crudfirebase/heroe/heroe.component';
// MeanStack

// Login-Register
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

import { AboutComponent } from './components/meanstack/about/about.component';
import { ProjectsComponent } from './components/meanstack/projects/projects.component';
import { CreateComponent } from './components/meanstack/create/create.component';
import { ContactComponent } from './components/meanstack/contact/contact.component';


const routes: Routes = [
  // MeanStack
  { path: 'sobre-mi', component: AboutComponent},
  { path: 'proyectos', component: ProjectsComponent},
  { path: 'crear-proyecto', component: CreateComponent},
  { path: 'contacto', component: ContactComponent},


  // CrudFirebase
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] },
  { path: 'heroe/:id', component: HeroeComponent, canActivate: [AuthGuard] },

  // Redux
  { path: 'listaUsuarios', component: ListaComponent },
  { path: 'usuario/:id', component: UsuarioComponent },

  // Home
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // {path:'**', pathMatch: 'full', redirectTo:'home'},

  // Login-Register
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
