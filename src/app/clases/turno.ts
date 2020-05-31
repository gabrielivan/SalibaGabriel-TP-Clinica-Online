export class Turno {

    Id: number;
    IdProfesional: string;
    IdPaciente: string;
    Estado: Estado;
    Fecha: Date;

    public constructor(id: number, idProfesional: string, idPaciente: string, fecha: Date, estado: Estado) { 
        this.Id = id;
        this.IdProfesional = idProfesional;
        this.IdPaciente = idPaciente;
        this.Fecha = fecha;
        this.Estado = estado;
    }
    
}

 export enum Estado {
    Pendiente = "1",
    Aceptado = "2",
    Cancelado = "3"
  }
