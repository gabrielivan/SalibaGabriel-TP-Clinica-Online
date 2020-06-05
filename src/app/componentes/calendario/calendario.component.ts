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
  @Input() especialidad: any;
  @Input() profesionales: any;
  @Input() profesionalSeleccionado: any;

  date = new Date();
  fechaMinima = new Date();
  auxDiaFechaMaxima: number = this.date.getDate() + 15;
  auxMesFechaMaxima: number = this.date.getMonth();
  auxYearFechaMaxima: number = this.date.getFullYear();
  fechaMaxima = new Date(this.auxYearFechaMaxima, this.auxMesFechaMaxima, this.auxDiaFechaMaxima);
  fechaSeleccionada: Date = null;
  diasHorariosDisponibles: any = [];
  filtros: any;
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
    this.diasHorariosDisponibles = (this.diponibilidades(this.profesionalSeleccionado, this.especialidad));
    var date = new Date(d);
    const day = date.getDay();
    return this.filtrarDiasDelCalendario(day, this.diasHorariosDisponibles);
  };

  filtrarDiasDelCalendario(day: number, diasHorariosDisponibles: any) {
    var retorno = false;
    switch (day) {
      case 0: {
        //Lunes 
        diasHorariosDisponibles.forEach(element => {
          if (element.Dia == "Lunes") {
            retorno = true;
          }
        });
        break;
      }
      case 1: {
        //Martes
        diasHorariosDisponibles.forEach(element => {
          if (element.Dia == "Martes") {
            retorno = true;
          }
        });
        break;
      }
      case 2: {
        //Miercoles
        diasHorariosDisponibles.forEach(element => {
          if (element.Dia == "Miercoles") {
            retorno = true;
          }
        });
        break;
      }
      case 3: {
        //Jueves
        diasHorariosDisponibles.forEach(element => {
          if (element.Dia == "Jueves") {
            retorno = true;
          }
        });
        break;
      }
      case 4: {
        //Viernes
        diasHorariosDisponibles.forEach(element => {
          if (element.Dia == "Viernes") {
            retorno = true;
          }
        });
        break;
      }
      case 5: {
        //Sabado
        diasHorariosDisponibles.forEach(element => {
          if (element.Dia == "Sabado") {
            retorno = true;
          }
        });
        break;
      }
      case 6: {
        //Domingo
        retorno = false;
        break;
      }
    }
    return retorno;
  }

  public async seCambioLaFecha(event: any) {
    this.date = new Date(this.fechaSeleccionada);
    this.date.setDate(this.date.getDate() + 1);//Fix para que no tenga en cuenta el GMT
    this.date.setHours(this.horarioSeleccionado.hora);
    this.date.setMinutes(this.horarioSeleccionado.minutos);
    this.filtros = {
      fechaSeleccionada: this.date,
      diasHorariosDisponibles: this.diasHorariosDisponibles
    }
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

  diponibilidades(profesional: any, especialidad: any) {
    var diasHorariosDisponibles = [];
    var profesionales = JSON.parse(JSON.stringify(this.profesionales)); //FIX para que no tenga la referencia del original.

    if (profesional != null) {
      if (typeof profesional.disponibilidad == "string") {
        profesional.disponibilidad = JSON.parse(profesional.disponibilidad);
      }
      diasHorariosDisponibles = profesional.disponibilidad;
    }
    else if (especialidad != null) {
      profesionales.forEach(p => {
        if (p.especialidades && p.especialidades.length > 0 && p.especialidades.includes(especialidad)) {
          if (p.disponibilidad && p.disponibilidad.length > 0) {
            if (typeof p.disponibilidad == "string") {
              p.disponibilidad = JSON.parse(p.disponibilidad);
            }
            if (diasHorariosDisponibles.length > 0) {
              p.disponibilidad.forEach(d => {
                diasHorariosDisponibles.push(d);
              });
            }
            else {
              diasHorariosDisponibles = p.disponibilidad;
            }
          }
        }
      });
    }
    return diasHorariosDisponibles;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
