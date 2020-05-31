export class Turno {

    Id : number;
    IdProfesional : number;
    IdPaciente : number;
    Estado : Estado;

    public constructor(id: number, idProfesional: number, idPaciente: number, estado: Estado) { 
        this.Id = id;
        this.IdProfesional = idProfesional;
        this.IdPaciente = idPaciente;
        this.Estado = estado;
    }
    
}

 export enum Estado {
    Pendiente = "1",
    Aceptado = "2",
    Cancelado = "3"
  }
