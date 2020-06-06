import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';
import { Profesional } from 'src/app/clases/profesional';
import { Turno, Estado } from 'src/app/clases/turno';
import swal from 'sweetalert2';
import { OverlayPositionBuilder } from '@angular/cdk/overlay';

@Component({
  selector: 'app-agregar-turno',
  templateUrl: './agregar-turno.component.html',
  styleUrls: ['./agregar-turno.component.css']
})
export class AgregarTurnoComponent implements OnInit {

  @Input() paciente: any;

  fechaTurno: Date = null;
  especialidades: any = [];
  especialidadSeleccionada: string = "Sin especialidad";
  usuarios: any = [];
  turnos: any = [];
  profesionales: any[] = [];
  profesionalSeleccionado: any = null;
  turnoElegido: Turno = new Turno(0, "", "", this.fechaTurno, Estado.Pendiente);

  constructor(public firebaseService: FirebaseService) { }

  async ngOnInit() {
    this.especialidades = await this.firebaseService.getEspecialidades();
    this.especialidades.push("Sin especialidad");
    this.usuarios = await this.firebaseService.getUsers();
    this.turnos = await this.firebaseService.getShifts();
    console.log(this.turnos);

    if (this.usuarios != null) {
      this.usuarios.forEach(usr => {
        if (usr.tipo == "2")
          this.profesionales.push(usr);
      });
    }
  }

  crearTurno() {
    if (this.fechaTurno != null) {
      if (this.profesionalSeleccionado != null) {
        this.turnoElegido = new Turno(0, this.profesionalSeleccionado.uid, this.paciente.uid, this.fechaTurno, Estado.Pendiente);
        console.log(this.turnoElegido);
        this.firebaseService.guardarTurno(this.turnoElegido);
      }
      else if (this.especialidadSeleccionada != "Sin especialidad") {
        var profesionales = this.traerProfesionalesDisponibles();
        this.turnoElegido = new Turno(0, profesionales[0].uid, this.paciente.uid, this.fechaTurno, Estado.Pendiente);
        this.firebaseService.guardarTurno(this.turnoElegido);
      }
      else {
        swal.fire({
          title: 'Error.',
          text: 'Seleccione una especialidad o un profesional.',
          timer: 8000,
          showCancelButton: false,
          showConfirmButton: true,
          icon: "error"
        });
      }
    }
    else {
      swal.fire({
        title: 'Error.',
        text: 'Seleccione un dia y un horario.',
        timer: 8000,
        showCancelButton: false,
        showConfirmButton: true,
        icon: "error"
      });
    }
  }

  fechaElegida(fecha: Date) {
    this.fechaTurno = fecha;
  }

  traerProfesionalesDisponibles() {
    var retorno = [];
    this.profesionales.forEach(profesional => {
      if (profesional.especialidades && profesional.especialidades.length > 0 && profesional.especialidades.includes(this.especialidadSeleccionada)) {
        //profesionales que atienden para esa especialidad
        var auxDia = this.fechaTurno.getDay() - 1;
        var dia = this.conversorDia(auxDia);
        var hora = this.fechaTurno.getHours();
        var isValid = false;

        if(typeof profesional.disponibilidad == "string"){
          profesional.disponibilidad = JSON.parse(profesional.disponibilidad);
        }

        //filtro por disponibilidad del profesional
        profesional.disponibilidad.forEach(d => {
          if (d.Dia == dia && d.Hora == hora.toString()) {
            //joya, un profesional atiende el dia seleccionado y la current hora a priori
            isValid = true;
          }
        });

        if (isValid) {
          //filtro por turnos ocupados
          var profesionalEstaDisponible = true;
          this.turnos.forEach(turno => {//recorro turno por turno
            if (turno.estado == Estado.Aceptado || turno.estado == Estado.Pendiente) {
              if (turno.idProfesional == profesional.uid) {
                if (turno.fecha == this.fechaTurno) {
                  var profesionalEstaDisponible = false;
                }
              }
            }
          });
          if (profesionalEstaDisponible) {
            retorno.push(profesional);
          }
        }
      }
    });
    return retorno;
  }

  conversorDia(dia: number) {
    var retorno: string = "";
    switch (dia) {
      case 0: {
        //Lunes
        retorno = "Lunes";
        break;
      }
      case 1: {
        //Martes
        retorno = "Martes";
        break;
      }
      case 2: {
        //Miercoles
        retorno = "Miercoles";
        break;
      }
      case 3: {
        //Jueves
        retorno = "Jueves";
        break;
      }
      case 4: {
        //Viernes
        retorno = "Viernes";
        break;
      }
      case 5: {
        //Sabado
        retorno = "Sabado";
        break;
      }
      case 6: {
        //Domingo
        retorno = "Domingo";
      }
    }
    return retorno;
  }

}
