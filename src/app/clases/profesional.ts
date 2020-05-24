import { Usuario } from './usuario';
import {TipoDeUsuario} from './usuario';

export class Profesional extends Usuario {

    Especialidad : Especialidad [];
  
    public constructor(id: number, nombre: string, apellido: string, sexo: string, fechaDeNacimiento: string, email: string, foto: string, tipo: TipoDeUsuario, especialidad: Especialidad []) { 
        super(id, nombre, apellido, sexo, fechaDeNacimiento, email, foto, tipo, 0, 0);
        this.Especialidad = especialidad;
    }
    
}

export enum Especialidad {
    Dermatología = "1",
    Traumatología = "2",
    Ginecología = "3",
    Cardiología = "4"
  }
