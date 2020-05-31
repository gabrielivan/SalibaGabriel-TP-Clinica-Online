import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { CartillaComponent } from './componentes/cartilla/cartilla.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import{firebaseConfig}from '../environments/environment'
    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp(firebaseConfig);
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CargaImagenComponent } from './componentes/carga-imagen/carga-imagen.component';
import { AgregarTurnoComponent } from './componentes/agregar-turno/agregar-turno.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrincipalComponent,
    TurnosComponent,
    CartillaComponent,
    LoginComponent,
    RegisterComponent,
    CargaImagenComponent,
    AgregarTurnoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }