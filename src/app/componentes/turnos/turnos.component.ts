import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})

export class TurnosComponent implements OnInit {
  paciente: any;
  turnos: any = [];
  resena: string = "";
  encuestaComponente = false;
  turnoParaEncuesta: any = null;

  constructor(public firebaseService: FirebaseService) { }

  async ngOnInit() {
    await this.delay(3000);
    var authCurrentUser = await this.firebaseService.getAuthCurrentUser();
    this.paciente = await this.firebaseService.getUser(authCurrentUser.uid);
    this.turnos = await this.firebaseService.getShifts();
    if (this.turnos != null && this.paciente != null) {
      var paciente = this.paciente;
      this.turnos = this.turnos.filter(function (x) {
        return x.idPaciente == paciente.uid;
      })
    }
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  verResena(turno: any){
    this.resena = turno.resena;
  }

  completarEncuesta(turno: any){
    this.turnoParaEncuesta = turno;
    this.encuestaComponente = true;
  }

  seCompletoLaEncuesta(event){
    this.encuestaComponente = event;
  }

  cancelarTurno(turno: any){
    if(turno.estado != "3" && turno.estado != "4" && turno.estado != "5"){
      turno.estado = "3";
    }
    else if(turno.estado == "3"){
      turno.estado = "1";
    }
  }

  guardarEstados(){
    var turnos = [];
    this.turnos.forEach(turno => {
      if(turno.estado == "3"){
        turnos.push(turno);
      }
    });
    this.firebaseService.guardarEstados(turnos);
  }
}
