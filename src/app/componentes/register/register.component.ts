import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';
import { Usuario, TipoDeUsuario } from 'src/app/clases/usuario';
import swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentUser: any;
  hide = true;
  date = new Date;
  usuario: Usuario = new Usuario(0, "", "", "", this.date, "", "", TipoDeUsuario.Administrador, 0, 0);
  especialidades: any = [];
  especialidadesSeleccionadas: string[] = null;
  fotoDos = "";
  clave = "";
  captchaOkey = false;

  resolved(captchaResponse: string) {
    if (captchaResponse.length > 0) {
      this.captchaOkey = true;
    }
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  onScriptLoad() {
    console.log('Google reCAPTCHA loaded and is ready for use!');
  }

  onScriptError() {
    console.log('Something went long when loading the Google reCAPTCHA')
  }

  constructor(public firebaseService: FirebaseService) {
  }

  async ngOnInit() {
    this.especialidades = await this.firebaseService.getEspecialidades();
    await this.delay(3000);
    var authCurrentUser = await this.firebaseService.getAuthCurrentUser();
    if (authCurrentUser && authCurrentUser.uid) {
      this.currentUser = await this.firebaseService.getUser(authCurrentUser.uid);
      console.log(this.currentUser);
    }
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  register() {
    if (this.captchaOkey != false) {
      console.log(this.usuario, this.especialidadesSeleccionadas, this.fotoDos, this.clave);
      this.firebaseService.AddUser(this.usuario, this.especialidadesSeleccionadas, this.fotoDos, this.clave);
    }
    else {
      swal.fire({
        title: 'Error.',
        text: 'Confirme que no es un robot.',
        timer: 3000,
        showCancelButton: false,
        showConfirmButton: false,
        icon: "error"
      });
    }
  }

  esProfesional() {
    return this.usuario.Tipo == TipoDeUsuario.Profesional;
  }

  esPaciente() {
    return this.usuario.Tipo == TipoDeUsuario.Paciente;
  }

  esAdministrador() {
    if (this.currentUser != null) {
      return this.currentUser.tipo == TipoDeUsuario.Administrador;
    }
  }

  onImageUpload(url) {
    this.usuario.Foto = url;
  }
  onImage2Upload(url) {
    this.fotoDos = url;
  }

}
