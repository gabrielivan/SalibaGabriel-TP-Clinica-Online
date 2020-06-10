import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Usuario, TipoDeUsuario } from "../clases/usuario";
import "firebase/auth";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Turno } from '../clases/turno';
import { Horario } from '../clases/horario';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user = null;

  constructor(private router: Router, private storage: AngularFireStorage) { }

  db = firebase.firestore();

  AddUser(usuario: Usuario, especialidades: string[], fotoDos: string, clave: string) {
    var dbRef = this.db;
    var router = this.router;
    var validated = 1;
    if (usuario.Tipo == TipoDeUsuario.Profesional) {
      validated = 0;
    }
    firebase.auth().createUserWithEmailAndPassword(usuario.Email, clave)
      .then(function (credential) {
        console.log(credential.user.uid);
        dbRef.collection("usuarios").add({
          uid: credential.user.uid,
          nombre: usuario.Nombre,
          apellido: usuario.Apellido,
          sexo: usuario.Sexo,
          fechaDeNacimiento: usuario.FechaDeNacimiento,
          email: usuario.Email,
          foto: usuario.Foto,
          fotoDos: fotoDos,
          especialidades: especialidades,
          tipo: usuario.Tipo,
          isDeleted: 0,
          isValidated: validated
        })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            swal.fire({
              title: 'EXITO.',
              text: 'Se registro correctamente',
              timer: 3000,
              showCancelButton: false,
              showConfirmButton: false,
              icon: "success"
            });
            credential.user.getIdToken()
              .then(function (token) {
                localStorage.setItem('token', token);
                router.navigate(['/']);
              });

          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
            swal.fire({
              title: 'ERROR.',
              text: 'Ocurrio un error al registrarse',
              timer: 3000,
              showCancelButton: false,
              showConfirmButton: false,
              icon: "error"
            });
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        swal.fire({
          title: 'ERROR.',
          text: 'Ocurrio un error al registrarse',
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
          icon: "error"
        });
        // ...
      });

  }

  login(email, password) {
    var router = this.router;
    var dbRef = this.db;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (credential) {
        console.log(credential);
        dbRef.collection("usuarios")
          .where("uid", "==", credential.user.uid)
          .where("isDeleted", "==", 0)
          .where("isValidated", "==", 1)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              swal.fire({
                title: 'EXITO.',
                text: 'Se logeo correctamente',
                timer: 3000,
                showCancelButton: false,
                showConfirmButton: false,
                icon: "success"
              });
              credential.user.getIdToken()
                .then(function (token) {
                  localStorage.setItem('token', token);
                  router.navigate(['/']);
                });
            });
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        swal.fire({
          title: 'ERROR.',
          text: 'Ocurrio un error al logearse',
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
          icon: "error"
        });
        // ...
      });
  }

  isAuthenticated() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem('token');
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  async getCurrentUser() {
    firebase.auth().onAuthStateChanged(async user => {
      this.user = user;
    });
  }

  public subirArchivo(nombreArchivo: string, obj: any) {
    return this.storage.upload(nombreArchivo, obj);
  }

  public referenciaArchivo(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  async getEspecialidades() {
    let espRef = await this.db.collection('especialidades').get();
    var rv = [];
    for (let e of espRef.docs) {
      rv.push(e.data());
    }
    return rv.map(function (x) { return x.nombre });
  }

  async getAuthCurrentUser() {
    return firebase.auth().currentUser;
  }

  async getUser(id: string) {
    let usrsRef = await this.db.collection('usuarios')
      .where("uid", "==", id)
      .get();
    return usrsRef.docs.shift().data() as Usuario;
  }

  async getUsers() {
    // return await db.collection("usuarios").get();
    let usrsRef = await this.db.collection('usuarios').get();
    var rv = [];
    for (let u of usrsRef.docs) {
      rv.push(u.data() as Usuario);
    }
    return rv;
  }

  async getShifts() {
    let usrsRef = await this.db.collection('turnos').get();
    var rv = [];
    for (let u of usrsRef.docs) {
      rv.push(u.data() as Turno);
    }
    for (let r of rv) {
      let unix_timestamp = r.fecha.seconds
      var date = new Date(unix_timestamp * 1000);
      r.fecha = date;
    }
    return rv;
  }

  async guardarDisponibilidad(profesional: any, disponibilidad: Array<Horario>) {

    var db = this.db;
    let usuarios = this.db.collection('usuarios')
    let activeRef = await usuarios
      .where('uid', '==', profesional.uid)
      .get();

    var jsonDisponibilidad = JSON.stringify(disponibilidad);
    //update
    activeRef.docs.forEach(function (doc) {

      db.collection("usuarios").doc(doc.id)
        .update({ disponibilidad: jsonDisponibilidad });
    });

  }

  async guardarTurno(turno: Turno) {
    let turnos = this.db.collection('turnos');
    if (turno) {
      turnos.add({
        estado: turno.Estado,
        fecha: turno.Fecha,
        idPaciente: turno.IdPaciente,
        idProfesional: turno.IdProfesional
      })
        .then(function (docRef) {
          swal.fire({
            title: 'EXITO.',
            text: 'Se registro su turno correctamente',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
            icon: "success"
          });
        });
    }
  }

  async guardarEncuesta(turno: any) {
    var db = this.db;
    let usuarios = this.db.collection('turnos')
    let activeRef = await usuarios
      .where('fecha', '==', turno.fecha)
      .where('idPaciente', '==', turno.idPaciente)
      .get();

    var jsonEncuesta = JSON.stringify(turno.encuesta);
    //update
    activeRef.docs.forEach(function (doc) {
      db.collection("turnos").doc(doc.id)
        .update({ encuesta: jsonEncuesta });
      swal.fire({
        title: 'EXITO.',
        text: 'Su encuesta fue registrada correctamente',
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
        icon: "success"
      });
    });
  }

  async guardarResena(turno: any) {
    var db = this.db;
    let usuarios = this.db.collection('turnos')
    let activeRef = await usuarios
      .where('fecha', '==', turno.fecha)
      .where('idProfesional', '==', turno.idProfesional)
      .get();

    //update
    activeRef.docs.forEach(function (doc) {
      db.collection("turnos").doc(doc.id)
        .update({
          resena: turno.resena,
          estado: turno.estado
        });
      swal.fire({
        title: 'EXITO.',
        text: 'Su reseña fue registrada correctamente',
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
        icon: "success"
      });
    });
  }

  async guardarEstados(turnos: any[]) {
    var db = this.db;
    turnos.forEach(async turno => {
      let turnos = this.db.collection('turnos')
      let activeRef = await turnos
        .where('fecha', '==', turno.fecha)
        .where('idProfesional', '==', turno.idProfesional)
        .where('idPaciente', '==', turno.idPaciente)
        .get();

      //update
      activeRef.docs.forEach(function (doc) {
        db.collection("turnos").doc(doc.id)
          .update({
            estado: turno.estado
          });
      });
      swal.fire({
        title: 'EXITO.',
        text: 'Se guardaron sus cambios correctamente',
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
        icon: "success"
      });
    });
  }

  async guardarBorradoValidado(usuarios: any[]) {
    var db = this.db;
    usuarios.forEach(async usuario => {
      let usuarios = this.db.collection('usuarios')
      let activeRef = await usuarios
        .where('uid', '==', usuario.uid)
        .get();

      //update
      activeRef.docs.forEach(function (doc) {
        db.collection("usuarios").doc(doc.id)
          .update({
            isDeleted: usuario.isDeleted,
            isValidated: usuario.isValidated
          });
      });
      swal.fire({
        title: 'EXITO.',
        text: 'Se guardaron sus cambios correctamente',
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
        icon: "success"
      });
    });
  }


}
