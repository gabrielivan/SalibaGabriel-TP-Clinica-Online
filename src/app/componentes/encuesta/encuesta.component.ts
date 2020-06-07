import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Encuesta } from '../../clases/encuesta';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  @Input() turno: any;
  @Output() encuestaCompletada: EventEmitter<any> = new EventEmitter<any>();
  encuesta = new Encuesta("", "", 0, false, "", true, "");

  frecuencias = ["Menos de 5 dias", "Mas de 5 dias", "Mas de 10 dias"];

  constructor() { }

  ngOnInit(): void {
  }

  guardarEncuesta() {
    this.turno.encuesta = this.encuesta;
    //updatear en firebase el turno
    this.encuestaCompletada.emit(false);
  }
}
