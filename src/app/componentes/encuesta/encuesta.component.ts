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
  encuesta = null;

  frecuencias = ["Menos de 5 dias", "Mas de 5 dias", "Mas de 10 dias"];

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    if(this.turno.encuesta){
      var encuesta = JSON.parse(this.turno.encuesta);
      this.encuesta = encuesta;
    }
    else{
      this.encuesta = new Encuesta("", "", 0, false, "", true, "");
    }
  }

  guardarEncuesta() {
    this.turno.encuesta = this.encuesta;
    this.firebaseService.guardarEncuesta(this.turno);
    this.encuestaCompletada.emit(false);
  }
}
