import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-baja-validar',
  templateUrl: './baja-validar.component.html',
  styleUrls: ['./baja-validar.component.css']
})
export class BajaValidarComponent implements OnInit {

  usuarios: any = [];

  constructor(public firebaseService: FirebaseService) { }

  async ngOnInit() {
    var users = await this.firebaseService.getUsers();
    users.forEach(user => {
      if(user.isDeleted == 0){
        this.usuarios.push(user);
      }
    });
  }

  validarProfesional(profesional: any) {
    profesional.isValidated = 1;
  }

  borrarUsuario(usuario: any) {
    usuario.isDeleted = 1;
  }

  guardarCambios() {
    this.firebaseService.guardarBorradoValidado(this.usuarios);
  }

}
