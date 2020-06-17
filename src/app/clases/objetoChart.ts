export class ObjetoChart {

    Data: any[];
    ObjetoDeLaData: any = {
        name: "",
        data: []
    };
    TextoUno: string;
    TextoDos: string;
    Categorias: string[];

    public constructor(data: any[], textoUno: string, textoDos: string, categorias: string[]) {
        this.Data = data;
        this.TextoUno = textoUno;
        this.TextoDos = textoDos;
        this.Categorias = categorias;
    }

}

