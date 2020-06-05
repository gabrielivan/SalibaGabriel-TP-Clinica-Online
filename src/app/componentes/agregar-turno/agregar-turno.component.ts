import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';
import { Profesional } from 'src/app/clases/profesional';
import { Turno, Estado } from 'src/app/clases/turno';
import swal from 'sweetalert2';

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
        var profesional: any;
        this.profesionales.forEach(p => {
          if (p.especialidades && p.especialidades.length > 0 && p.especialidades.includes(this.especialidadSeleccionada)) {
            profesional = p;
          }
        })
        this.turnoElegido = new Turno(0, profesional.uid, this.paciente.uid, this.fechaTurno, Estado.Pendiente);
        console.log(this.turnoElegido);
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

}
