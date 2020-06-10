import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { AuthGuard } from './helpers/auth.guard';


const routes: Routes = [
  {path:"", component: HomeComponent, canActivate: [AuthGuard], data: {animation: 'Home'}}
  ,{path:"login", component: LoginComponent, data: {animation: 'Login'}}
  ,{path:"register", component: RegisterComponent, data: {animation: 'Register'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
