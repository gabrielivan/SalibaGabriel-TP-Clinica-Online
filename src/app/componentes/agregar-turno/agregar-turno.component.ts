import { Component, OnInit } from '@angular/core';
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

  date = new Date;
  especialidades: any = [];
  especialidadSeleccionada: string = "";
  usuarios: any = [];
  turnos: any = [];
  profesionales: Profesional[] = [];
  profesionalSeleccionado: Profesional = null;
  turnoElegido: Turno = new Turno(0, "", "", this.date, Estado.Pendiente);
  
  constructor(public firebaseService: FirebaseService) { }

  async ngOnInit() {
    this.especialidades = await this.firebaseService.getEspecialidades();
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
    console.log("crear turno");
  }

  fechaElegida(fecha: Date){
    console.log(fecha);
  }

}
