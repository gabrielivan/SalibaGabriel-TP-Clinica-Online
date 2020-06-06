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
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentUtcDateAdapter } from './moment-utc-date-adapter';
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
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { FiltrarProfesionalesPipe } from './pipes/filtrar-profesionales.pipe';
import { AgregarDisponibilidadComponent } from './componentes/agregar-disponibilidad/agregar-disponibilidad.component';
import { FiltrarHorariosPipe } from './pipes/filtrar-horarios.pipe';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrincipalComponent,
    TurnosComponent,
    LoginComponent,
    RegisterComponent,
    CargaImagenComponent,
    AgregarTurnoComponent,
    CalendarioComponent,
    FiltrarProfesionalesPipe,
    AgregarDisponibilidadComponent,
    FiltrarHorariosPipe,
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
    MatDatepickerModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }