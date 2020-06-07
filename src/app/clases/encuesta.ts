export class Encuesta {

    Nombre : string;
    Apellido : string;
    NivelSatisfaccion : number;
    PrimeraVezAtendido : boolean;
    Frecuencia : string;
    VolverseAtender : boolean;
    ComoConocio : string;

    public constructor(nombre: string, apellido: string, nivelSatisfaccion: number, primeraVezAtendido: boolean, frecuencia: string, volverseAtender: boolean, comoConocio: string) { 
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.NivelSatisfaccion = nivelSatisfaccion;
        this.PrimeraVezAtendido = primeraVezAtendido;
        this.Frecuencia = frecuencia;
        this.VolverseAtender = volverseAtender;
        this.ComoConocio = comoConocio;
    }
    
}

