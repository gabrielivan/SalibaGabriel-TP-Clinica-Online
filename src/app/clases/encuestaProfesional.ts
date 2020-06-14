export class EncuestaProfesional {

    NombreProfesional : string;
    ApellidoProfesional : string;
    NombrePaciente : string;
    ApellidoPaciente : string;
    TemperaturaCorporalPaciente : number;
    AlturaPaciente : number;
    EdadPaciente : number;
    PresionPaciente : string;
    OtrasPropiedadesPaciente: string

    public constructor(nombreProfesional: string, apellidoProfesional: string, nombrePaciente: string, apellidoPaciente: string, temperaturaCorporalPaciente: number, alturaPaciente: number, edadPaciente: number, presionPaciente: string, otrasPropiedadesPaciente: string) { 
        this.NombreProfesional = nombreProfesional;
        this.ApellidoProfesional = apellidoProfesional;
        this.NombrePaciente = nombrePaciente;
        this.ApellidoPaciente = apellidoPaciente;
        this.TemperaturaCorporalPaciente = temperaturaCorporalPaciente;
        this.AlturaPaciente = alturaPaciente;
        this.EdadPaciente = edadPaciente;
        this.PresionPaciente = presionPaciente;
        this.OtrasPropiedadesPaciente = otrasPropiedadesPaciente;
    }
    
}

