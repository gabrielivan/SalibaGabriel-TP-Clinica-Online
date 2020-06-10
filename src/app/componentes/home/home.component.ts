import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { Usuario, TipoDeUsuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;

  constructor(public firebaseService: FirebaseService) { }

  async ngOnInit() {
    await this.delay(3000);
    var authCurrentUser = await this.firebaseService.getAuthCurrentUser();
    if (authCurrentUser) {
      this.currentUser = await this.firebaseService.getUser(authCurrentUser.uid);
      console.log(this.currentUser);
    }
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  esAdministrador() {
    if (this.currentUser != null) {
      return this.currentUser.tipo == TipoDeUsuario.Administrador;
    }
  }

  esPaciente() {
    if (this.currentUser != null) {
      return this.currentUser.tipo == TipoDeUsuario.Paciente;
    }
  }

  esProfesional() {
    if (this.currentUser != null) {
      return this.currentUser.tipo == TipoDeUsuario.Profesional;
    }
  }

}
