import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { Usuario, TipoDeUsuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin = false;
  currentUser: any;
  
  constructor(public firebaseService: FirebaseService) { }

  async ngOnInit() {
    await this.delay(3000);
    var authCurrentUser = await this.firebaseService.getAuthCurrentUser();
    this.currentUser = await this.firebaseService.getUser(authCurrentUser.uid);
    console.log(this.currentUser);
    this.isAdmin = this.currentUser.tipo == "3"; //es administrador
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
