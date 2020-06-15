export class LogProfesional {

    Fecha: Date;
    NombreProfesional: string;
    ApellidoProfesional: string;
    EmailProfesional: string;

    public constructor(fecha: Date, nombreProfesional: string, apellidoProfesional: string, emailProfesional: string) {
        this.Fecha = fecha;
        this.NombreProfesional = nombreProfesional;
        this.ApellidoProfesional = apellidoProfesional;
        this.EmailProfesional = emailProfesional;
    }

}

