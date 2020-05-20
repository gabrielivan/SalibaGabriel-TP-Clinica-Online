import { Injectable } from '@angular/core';
import swal from'sweetalert2';
import "firebase/auth";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user = null;

  constructor(private router: Router) { }

  db = firebase.firestore();

  AddUser(nombre, apellido, email, clave, sexo, fechaDeNacimiento, tipo) {
    var dbRef = this.db;
    var router = this.router;
    firebase.auth().createUserWithEmailAndPassword(email, clave)
      .then(function (credential) {
        console.log(credential.user.uid);
        dbRef.collection("usuarios").add({
          uid: credential.user.uid,
          email: email,
          nombre: nombre,
          apellido: apellido,
          sexo: sexo,
          fechaDeNacimiento: fechaDeNacimiento,
          tipo: tipo
        })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            swal.fire({
              title: 'EXISTO.',
              text: 'Se registro correctamente',
              timer: 2000,
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
              timer: 2000,
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
          timer: 2000,
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
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              swal.fire({
                title: 'EXISTO.',
                text: 'Se logeo correctamente',
                timer: 2000,
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
          timer: 2000,
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

}
