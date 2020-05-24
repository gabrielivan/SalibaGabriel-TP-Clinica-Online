export class Usuario {

    Id : number;
    Nombre : string;
    Apellido : string;
    Sexo : string;
    FechaDeNacimiento: string;
    Email: string;
    Foto: string;
    Tipo: TipoDeUsuario;
    IsDeleted: number;
    IsValidated: number;

  
    public constructor(id: number, nombre: string, apellido: string, sexo: string, fechaDeNacimiento: string, email: string, foto: string, tipo: TipoDeUsuario, isDeleted: number, isValidated: number) { 
        this.Id = id;
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.Sexo = sexo;
        this.FechaDeNacimiento = fechaDeNacimiento;
        this.Email = email;
        this.Foto = foto;
        this.Tipo = tipo;
        this.IsDeleted = isDeleted;
        this.IsValidated = isValidated;
    }
    
}

 export enum TipoDeUsuario {
    Paciente = "1",
    Profesional = "2",
    Administrador = "3"
  }
