import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { Profesional } from 'src/app/clases/profesional';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  busqueda: string = "";
  usuarios: any = [];
  auxTurnos: any = [];
  turnos: any = [];
  turnosRv: any = [];

  constructor(public firebaseService: FirebaseService) { }

  async ngOnInit() {
    // await this.delay(3000);
    this.usuarios = await this.firebaseService.getUsers();
    this.auxTurnos = await this.firebaseService.getShifts();
    this.mapearTurnos(this.auxTurnos, this.turnos);
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  buscar() {
    var retorno = [];
    this.turnos.forEach(turno => {
      if (this.buscadorPorNombreDeUsuario(this.busqueda, turno)
        || this.buscadorPorApellidoDeUsuario(this.busqueda, turno)
        || this.buscadorPorFecha(this.busqueda, turno)
        || this.buscadorPorEncuestaPaciente(this.busqueda, turno.encuesta)
        || this.buscadorPorEncuestaProfesional(this.busqueda, turno.encuestaProfesional)) {
        retorno.push(turno);
      }
    });
    this.turnosRv = retorno;
  }

  buscadorPorNombreDeUsuario(nombre: string, turno: any) {
    var retorno = false;
    if (turno.paciente.nombre.includes(nombre) || turno.profesional.nombre.includes(nombre)) {
      retorno = true;
    }
    return retorno;
  }

  buscadorPorApellidoDeUsuario(apellido: string, turno: any) {
    var retorno = false;
    if (turno.paciente.apellido.includes(apellido) || turno.profesional.apellido.includes(apellido)) {
      retorno = true;
    }
    return retorno;
  }

  buscadorPorFecha(fecha: string, turno: any) {
    var retorno = false;
    if (turno.fecha.includes(fecha)
      || turno.paciente.fechaDeNacimiento.includes(fecha)
      || turno.profesional.fechaDeNacimiento.includes(fecha)) {
      retorno = true;
    }
    return retorno;
  }

  buscadorPorEncuestaPaciente(busqueda: string, encuestaPaciente: string) {
    var retorno = false;
    if (encuestaPaciente && encuestaPaciente.includes(busqueda)) {
      retorno = true;
    }
    return retorno;
  }

  buscadorPorEncuestaProfesional(busqueda: string, encuestaProfesional: string) {
    var retorno = false;
    if (encuestaProfesional && encuestaProfesional.includes(busqueda)) {
      retorno = true;
    }
    return retorno;
  }

  mapearTurnos(auxTurnos: any[], turnos: any[]) {
    var turno = {
      fecha: "",
      estado: "",
      encuesta: "",
      encuestaProfesional: "",
      resena: "",
      profesional: "",
      paciente: ""
    }
    auxTurnos.forEach(auxTurno => {
      turno.fecha = this.stringFecha(auxTurno.fecha);
      turno.estado = auxTurno.estado;
      turno.encuesta = auxTurno.encuesta;
      turno.encuestaProfesional = auxTurno.encuestaProfesional;
      turno.resena = auxTurno.resena;
      turno.profesional = this.getUsuario(auxTurno.idProfesional);
      turno.paciente = this.getUsuario(auxTurno.idPaciente);
      turnos.push(JSON.parse(JSON.stringify(turno)));
      this.limpiarTurno(turno);
    });
  }

  getUsuario(id: string) {
    var rv: any;
    this.usuarios.forEach(usr => {
      if (usr.uid == id) {
        rv = usr;
      }
    });
    return rv;
  }

  limpiarTurno(turno: any) {
    turno.fecha = "";
    turno.estado = "";
    turno.encuesta = "";
    turno.encuestaProfesional = "";
    turno.resena = "";
    turno.profesional = "";
    turno.paciente = "";
  }

  stringFecha(fecha: any) {
    var retorno = "";
    var year = fecha.getFullYear().toString();
    var month = (fecha.getMonth() + 1).toString();
    var date = fecha.getDate().toString();
    var hours = fecha.getHours().toString();
    var minutes = fecha.getMinutes().toString();
    if (minutes == "0") {
      minutes = "00";
    }
    retorno = date.concat("/", month, "/", year, " ", hours, ":", minutes, " hs.");
    return retorno;

  }

}
