import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';
import { Profesional } from 'src/app/clases/profesional';
import { Turno, Estado } from 'src/app/clases/turno';

@Component({
  selector: 'app-agregar-turno',
  templateUrl: './agregar-turno.component.html',
  styleUrls: ['./agregar-turno.component.css']
})
export class AgregarTurnoComponent implements OnInit {

  @Input() paciente: any;

  fechaTurno = new Date;
  especialidades: any = [];
  especialidadSeleccionada: string = "";
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

    if(this.usuarios != null){
      this.usuarios.forEach(usr => {
        if(usr.tipo == "2")
        this.profesionales.push(usr);
      });
    }
  }

  crearTurno(){
    this.turnoElegido = new Turno(0, this.profesionalSeleccionado.uid, this.paciente.uid, this.fechaTurno, Estado.Pendiente);
    console.log(this.turnoElegido);
    this.firebaseService.guardarTurno(this.turnoElegido);
  }

  fechaElegida(fecha: Date){
    this.fechaTurno = fecha;
  }

}
