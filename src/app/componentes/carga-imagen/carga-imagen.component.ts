import { Component, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-carga-imagen',
  templateUrl: './carga-imagen.component.html',
  styleUrls: ['./carga-imagen.component.css']
})
export class CargaImagenComponent {

  @Output() imageUrl: EventEmitter<any>= new EventEmitter<any>();
  constructor (
    private firebaseService: FirebaseService
  ) {}

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.firebaseService.referenciaArchivo(this.nombreArchivo);
    let tarea = this.firebaseService.subirArchivo(this.nombreArchivo, archivo);

    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
      this.imageUrl.emit(URL);
    });
  }

}
