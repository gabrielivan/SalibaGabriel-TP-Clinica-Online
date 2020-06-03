import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @Output() fechaElegida: EventEmitter<any>= new EventEmitter<any>();
  @Input() profesional: Profesional;
  
  fechaMinima = new Date();
  fechaSeleccionada: Date = null; 
  //horarios de lunes a viernes de 8hs a 19hs/sabados de 8hs a 14hs
  horarios = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  horarioSeleccionado = null;

  evitarDomingos = (d: Date): boolean => {
    var date = new Date(d);
    const day = date.getDay();
    // Previene que se eliga un Domingo
    return day !== 0 && day !== 6;
  };

  public async seCambioLaFecha(event) {
    console.log(this.fechaSeleccionada);
    console.log(this.profesional);
    console.log(this.profesional.Disponibilidad);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
