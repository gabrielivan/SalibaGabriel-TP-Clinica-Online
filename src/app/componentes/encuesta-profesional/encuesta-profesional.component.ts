import { Component, OnInit, Input } from '@angular/core';
import { EncuestaProfesional } from '../../clases/encuestaProfesional';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-encuesta-profesional',
  templateUrl: './encuesta-profesional.component.html',
  styleUrls: ['./encuesta-profesional.component.css']
})
export class EncuestaProfesionalComponent implements OnInit {

  @Input() turno: any;
  encuestaProfesional = null;
  panelOpenState = false;

  presiones = ["12.6", "12.8", "13.6", "13.8", "14.6", "14.8", "15.6", "15.8", "16.6", "16.8"];

  propiedades = [
    {campo : "campo", valor: "valor"},
    {campo : "campo", valor: "valor"},
    {campo : "campo", valor: "valor"}
  ];

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.encuestaProfesional = new EncuestaProfesional("", "", "", "", 36, 180, 18, "", "");
  }

  guardarEncuesta() {
    this.encuestaProfesional.OtrasPropiedadesPaciente = JSON.stringify(this.propiedades);
    this.turno.encuestaProfesional = this.encuestaProfesional;
    this.firebaseService.guardarEncuestaProfesional(this.turno);
  }

}
