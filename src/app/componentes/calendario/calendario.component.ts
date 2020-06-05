import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { element } from 'protractor';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @Output() fechaElegida: EventEmitter<any> = new EventEmitter<any>();
  @Input() profesional: any;

  date = new Date();
  fechaMinima = new Date();
  auxDiaFechaMaxima: number = this.date.getDate() + 15;
  auxMesFechaMaxima: number = this.date.getMonth();
  auxYearFechaMaxima: number = this.date.getFullYear();
  fechaMaxima = new Date(this.auxYearFechaMaxima, this.auxMesFechaMaxima, this.auxDiaFechaMaxima);
  
  fechaSeleccionada: Date = null;
  //horarios de lunes a viernes de 8hs a 19hs/sabados de 8hs a 14hs
  horarios = [
    { hora: 8, minutos: 0 }
    , { hora: 8, minutos: 30 }
    , { hora: 9, minutos: 0 }
    , { hora: 9, minutos: 30 }
    , { hora: 10, minutos: 0 }
    , { hora: 10, minutos: 30 }
    , { hora: 11, minutos: 0 }
    , { hora: 11, minutos: 30 }
    , { hora: 12, minutos: 0 }
    , { hora: 12, minutos: 30 }
    , { hora: 13, minutos: 0 }
    , { hora: 13, minutos: 30 }
    , { hora: 14, minutos: 0 }
    , { hora: 14, minutos: 30 }
    , { hora: 15, minutos: 0 }
    , { hora: 15, minutos: 30 }
    , { hora: 16, minutos: 0 }
    , { hora: 16, minutos: 30 }
    , { hora: 17, minutos: 0 }
    , { hora: 17, minutos: 30 }
    , { hora: 18, minutos: 0 }
    , { hora: 18, minutos: 30 }
  ]
  horarioSeleccionado = { hora: 0, minutos: 0 };

  evitarDomingos = (d: Date): boolean => {
    var date = new Date(d);
    const day = date.getDay();
    // Previene que se eliga un Domingo.
    return day !== 6;
  };

  public async seCambioLaFecha(event: any) {
    this.date = new Date(this.fechaSeleccionada);
    this.date.setDate(this.date.getDate() + 1);//Fix para que no tenga en cuenta el GMT
    this.date.setHours(this.horarioSeleccionado.hora);
    this.date.setMinutes(this.horarioSeleccionado.minutos);
    if (this.horarioSeleccionado.hora != 0) {
      this.fechaElegida.emit(this.date);
    }
  }

  public async seCambioElHorario(event) {
    if (this.fechaSeleccionada != null) {
      this.date.setHours(event.hora);
      this.date.setMinutes(event.minutos);
      this.fechaElegida.emit(this.date);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
