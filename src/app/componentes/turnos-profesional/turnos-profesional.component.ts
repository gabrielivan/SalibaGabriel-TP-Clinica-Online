import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-turnos-profesional',
  templateUrl: './turnos-profesional.component.html',
  styleUrls: ['./turnos-profesional.component.css']
})
export class TurnosProfesionalComponent implements OnInit {

  profesional: any;
  turnos: any = [];
  encuestaComponente = false;
  atender = false;
  turnoParaAtender: any = null;
  turnoParaEncuesta: any = null;

  constructor(public firebaseService: FirebaseService) { }

  async ngOnInit() {
    await this.delay(3000);
    var authCurrentUser = await this.firebaseService.getAuthCurrentUser();
    this.profesional = await this.firebaseService.getUser(authCurrentUser.uid);
    this.turnos = await this.firebaseService.getShifts();
    if (this.turnos != null && this.profesional != null) {
      var profesional = this.profesional;
      this.turnos = this.turnos.filter(function (x) {
        return x.idProfesional == profesional.uid;
      })
    }
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  cambiarEstado(turno: any, estado: string) {
    if (turno.estado != "4") {
      if (estado == "0" && turno.estado != "3" && turno.estado != "5") {// lo quiere atender
        this.turnoParaAtender = turno;
        this.atender = true;
      }
      else {
        if (estado == "0") {
          turno.estado = turno.estado;
        }
        else {
          turno.estado = estado;
          this.atender = false;
          this.turnoParaAtender = null
        }
      }
    }
  }

  verComentario(turno: any) {
    this.turnoParaEncuesta = turno;
    this.encuestaComponente = true;
  }

  seCompletoLaEncuesta(event) {

  }

  mandarResena(turno: any) {
    turno.estado = "4";
    this.firebaseService.guardarResena(turno);
  }

}
