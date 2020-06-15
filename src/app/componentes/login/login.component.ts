import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FirebaseService } from '../../servicios/firebase.service';
import { LogProfesional } from '../../clases/logProfesional';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  usuario = '';
  clave = '';
  date: Date = new Date();
  userByEmail: any;
  users: any[];
  logDelProfesional = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public firebaseService: FirebaseService) {
  }

  async ngOnInit() {
    await this.delay(3000);
    this.users = await this.firebaseService.getUsers();
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login() {
    if (this.users.length > 0) {
      this.users.forEach(usr => {
        if (usr.email == this.usuario) {
          this.userByEmail = usr;
        }
      });
      if (this.userByEmail && this.userByEmail.tipo == "2") {
        this.logDelProfesional = new LogProfesional(this.date, this.userByEmail.nombre, this.userByEmail.apellido, this.userByEmail.email);
      }
    }
    this.firebaseService.login(this.usuario, this.clave, this.logDelProfesional);
  }

}
