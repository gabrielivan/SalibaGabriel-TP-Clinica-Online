import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';
import { Profesional } from 'src/app/clases/profesional';

@Component({
  selector: 'app-agregar-turno',
  templateUrl: './agregar-turno.component.html',
  styleUrls: ['./agregar-turno.component.css']
})
export class AgregarTurnoComponent implements OnInit {

  especialidades: any = [];
  especialidadesSeleccionadas: string[] = null;
  usuarios: any = [];
  profesionales: Profesional[] = [];
  profesionalSeleccionado: Profesional = null;
  
  constructor(public firebaseService: FirebaseService) { }

  async ngOnInit() {
    this.especialidades = await this.firebaseService.getEspecialidades();
    this.usuarios = await this.firebaseService.getUsers();

    if(this.usuarios != null){
      this.usuarios.forEach(usr => {
        if(usr.tipo == "2")
        this.profesionales.push(usr);
      });
    }
  }

}
