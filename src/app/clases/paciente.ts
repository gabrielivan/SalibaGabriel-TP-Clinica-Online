import { Usuario } from './usuario';
import {Tipo} from './usuario';

export class Paciente extends Usuario {

    FotoDos : string;
  
    public constructor(id: number, nombre: string, apellido: string, sexo: string, fechaDeNacimiento: string, email: string, foto: string, tipo: Tipo, fotoDos: string)  { 
        super(id, nombre, apellido, sexo, fechaDeNacimiento, email, foto, tipo);
        this.FotoDos = fotoDos;
    }
    
}
