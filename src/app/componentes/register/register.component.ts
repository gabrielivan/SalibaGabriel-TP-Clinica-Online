import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';
import { Usuario, TipoDeUsuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentUser: Usuario;
  hide = true;
  date = new Date;
  usuario: Usuario = new Usuario(0, "", "", "", this.date, "", "", TipoDeUsuario.Paciente, 0, 0);
  especialidades: any = [];
  especialidadesSeleccionadas: string[] = null;
  fotoDos = "";
  clave = "";

  constructor(public firebaseService: FirebaseService) {
  }

  async ngOnInit() {
    this.especialidades = await this.firebaseService.getEspecialidades();
    await this.delay(3000);
    var authCurrentUser = await this.firebaseService.getAuthCurrentUser();
    this.currentUser = await this.firebaseService.getUser(authCurrentUser.uid);
    console.log(this.currentUser);
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  register() {
    console.log(this.usuario, this.especialidadesSeleccionadas, this.fotoDos, this.clave);
    this.firebaseService.AddUser(this.usuario, this.especialidadesSeleccionadas, this.fotoDos, this.clave);
  }

  esProfesional() {
    return this.usuario.Tipo == TipoDeUsuario.Profesional;
  }

  esPaciente() {
    return this.usuario.Tipo == TipoDeUsuario.Paciente;
  }

  onImageUpload(url) {
    this.usuario.Foto = url;
  }
  onImage2Upload(url) {
    this.fotoDos = url;
  }

}
