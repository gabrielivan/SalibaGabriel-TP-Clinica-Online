export class Usuario {

    Id : number;
    Nombre : string;
    Apellido : string;
    Sexo : string;
    FechaDeNacimiento: string;
    Email: string;
    Foto: string;
    Tipo: Tipo;

  
    public constructor(id: number, nombre: string, apellido: string, sexo: string, fechaDeNacimiento: string, email: string, foto: string, tipo: Tipo) { 
        this.Id = id;
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.Sexo = sexo;
        this.FechaDeNacimiento = fechaDeNacimiento;
        this.Email = email;
        this.Foto = foto;
        this.Tipo = tipo;
    }
    
}

export enum Tipo {
    Paciente = 1,
    Profesional = 2,
    Administrador = 3
  }
