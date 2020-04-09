import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Redux
import { ListaComponent } from './components/usuarios/lista/lista.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { BehaviorSubjectComponent } from './components/usuarios/behavior-subject/behavior-subject.component';
import { Covid19Component } from './components/usuarios/covid19/covid19.component';


// Home
import { HomeComponent } from './shared/home/home.component';

// CrudFirebase
import { HeroesComponent } from './components/crudfirebase/heroes/heroes.component';
import { HeroeComponent } from './components/crudfirebase/heroe/heroe.component';

// MeanStack
import { PrivateTasksComponent } from './components/meanstack/private-tasks/private-tasks.component';
import { ProjectsComponent } from './components/meanstack/projects/projects.component';
import { CreateComponent } from './components/meanstack/create/create.component';
import { SigninComponent } from './components/meanstack/signin/signin.component';
import { SignupComponent } from './components/meanstack/signup/signup.component';

// Login-Register
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { AuthMeanGuard } from './guards/auth-mean.guard';

const routes: Routes = [
  // MeanStack
  { path: 'proyectos', component: ProjectsComponent },
  { path: 'crear-proyecto', component: CreateComponent },
  { path: 'private', component: PrivateTasksComponent,canActivate:[AuthMeanGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },


  // CrudFirebase
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] },
  { path: 'heroe/:id', component: HeroeComponent, canActivate: [AuthGuard] },

  // Redux
  { path: 'listaUsuarios', component: ListaComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: 'BehaviorSubject', component: BehaviorSubjectComponent },
  { path: 'covid19', component: Covid19Component },

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
