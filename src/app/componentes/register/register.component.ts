import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import{ FirebaseService}from '../../servicios/firebase.service';
import { Usuario, TipoDeUsuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  usuario: Usuario = new Usuario(0, "", "", "", "", "", "", TipoDeUsuario.Paciente, 0, 0);
  especialidades: any = [];
  especialidadesSeleccionadas: string [];
  fotoDos = "";
  clave = "";

  // toppings = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(public firebaseService: FirebaseService) {
  }

  async ngOnInit() {
    this.especialidades = await this.firebaseService.getEspecialidades();
    console.log(this.especialidades);
  }

  register()
  {
    console.log(this.usuario, this.especialidadesSeleccionadas, this.fotoDos, this.clave);
    this.firebaseService.AddUser(this.usuario, this.especialidadesSeleccionadas, this.fotoDos, this.clave);
  }

  esProfesional(){
    return this.usuario.Tipo == TipoDeUsuario.Profesional;
  }

  esPaciente(){
    return this.usuario.Tipo == TipoDeUsuario.Paciente;
  }

  onImageUpload(url){
    this.usuario.Foto = url;
  }
  onImage2Upload(url){
    this.fotoDos = url;
  }

}
