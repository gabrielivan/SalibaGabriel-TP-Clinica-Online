import { Component, OnInit, Input } from '@angular/core';
import { Horario } from 'src/app/clases/horario';
import { Profesional } from 'src/app/clases/profesional';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-agregar-disponibilidad',
  templateUrl: './agregar-disponibilidad.component.html',
  styleUrls: ['./agregar-disponibilidad.component.css']
})
export class AgregarDisponibilidadComponent implements OnInit {

  @Input() profesional: any;
  
  dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  horarios = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
  diaSeleccionado: string = "";
  horarioSeleccionado: string = "";
  disponibilidadDelProfesional: any = [];
  
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  agregarDisponibilidad(dia: string, hora: string){
    var diaHorario = new Horario(0, dia, hora);
    this.disponibilidadDelProfesional.push(diaHorario);
  }

  guardarDisponibilidad(){
    console.log(this.profesional);
    console.log(this.disponibilidadDelProfesional);
    this.firebaseService.guardarDisponibilidad(this.profesional, this.disponibilidadDelProfesional);
  }

}
