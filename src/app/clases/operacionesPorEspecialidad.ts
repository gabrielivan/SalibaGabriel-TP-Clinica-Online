export class OperacionesPorEspecialidad {

    NombreProfesional: string;
    ApellidoProfesional: string;
    Especialidad: string;
    Cantidad: string;

    public constructor(nombreProfesional: string, apellidoProfesional: string, especialidad: string, cantidad: string) {
        this.NombreProfesional = nombreProfesional;
        this.ApellidoProfesional = apellidoProfesional;
        this.Especialidad = especialidad;
        this.Cantidad = cantidad;
    }

}

