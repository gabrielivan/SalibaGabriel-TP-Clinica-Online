import { Usuario } from './usuario';
import {TipoDeUsuario} from './usuario';

export class Paciente extends Usuario {

    FotoDos : string;
  
    public constructor(id: number, nombre: string, apellido: string, sexo: string, fechaDeNacimiento: string, email: string, foto: string, tipo: TipoDeUsuario, fotoDos: string)  { 
        super(id, nombre, apellido, sexo, fechaDeNacimiento, email, foto, tipo, 0, 1);
        this.FotoDos = fotoDos;
    }
    
}
