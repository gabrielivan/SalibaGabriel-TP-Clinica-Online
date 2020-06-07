import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Encuesta } from '../../clases/encuesta';
import { FirebaseService } from '../../servicios/firebase.service';

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

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  guardarEncuesta() {
    this.turno.encuesta = this.encuesta;
    this.firebaseService.guardarEncuesta(this.turno);
    this.encuestaCompletada.emit(false);
  }
}
