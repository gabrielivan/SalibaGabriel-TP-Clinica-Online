import { Usuario } from './usuario';
import {TipoDeUsuario} from './usuario';

export class Profesional extends Usuario {

    Especialidades : string [];
  
    public constructor(id: number, nombre: string, apellido: string, sexo: string, fechaDeNacimiento: Date, email: string, foto: string, tipo: TipoDeUsuario, especialidades: string []) { 
        super(id, nombre, apellido, sexo, fechaDeNacimiento, email, foto, tipo, 0, 0);
        this.Especialidades = especialidades;
    }
    
}