import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { CartillaComponent } from './componentes/cartilla/cartilla.component';
import {MatTableModule} from '@angular/material/table';

 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrincipalComponent,
    TurnosComponent,
    CartillaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }