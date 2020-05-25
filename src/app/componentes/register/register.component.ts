import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import{ FirebaseService}from '../../servicios/firebase.service';
import { Usuario, TipoDeUsuario } from 'src/app/clases/usuario';
import{ Especialidad} from "../../clases/profesional";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  usuario: Usuario = new Usuario(0, "", "", "", "", "", "", TipoDeUsuario.Paciente, 0, 0);
  Especialidad: Especialidad = null;
  fotoDos = "";
  clave = "";

  constructor(public firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
  }

  register()
  {

    console.log(this.usuario, this.Especialidad, this.fotoDos, this.clave);
    this.firebaseService.AddUser(this.usuario, this.Especialidad, this.fotoDos, this.clave);
  }

  esProfesional(){
    return this.usuario.Tipo == TipoDeUsuario.Profesional;
  }

  onImageUpload(url){
    this.usuario.Foto = url;
  }

}
