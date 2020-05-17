import { Usuario } from './usuario';
import {Tipo} from './usuario';

export class Profesional extends Usuario {

    Especialidad : Especialidad [];
  
    public constructor(id: number, nombre: string, apellido: string, sexo: string, fechaDeNacimiento: string, email: string, foto: string, tipo: Tipo, especialidad: Especialidad []) { 
        super(id, nombre, apellido, sexo, fechaDeNacimiento, email, foto, tipo);
        this.Especialidad = especialidad;
    }
    
}

enum Especialidad {
    Dermatología,
    Traumatología,
    Ginecología ,
    Cardiología
  }
