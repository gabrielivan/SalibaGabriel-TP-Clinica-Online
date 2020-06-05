import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarHorarios'
})
export class FiltrarHorariosPipe implements PipeTransform {

  transform(horarios: any[], filtros: any): any {
    var retorno = [];
    if (filtros != null) {
      var auxDia = filtros.fechaSeleccionada.getDay() - 1;
      var dia = this.conversorDia(auxDia);
      filtros.diasHorariosDisponibles.forEach(element => {
        horarios.forEach(obj => {
          if (element.Dia == dia && element.Hora == obj.hora.toString()) {
            retorno.push(obj);
          }
        });
      });
    }
    return retorno;
  }

  conversorDia(dia: number) {
    var retorno: string = "";
    switch (dia) {
      case 0: {
        //Lunes
        retorno = "Lunes";
        break;
      }
      case 1: {
        //Martes
        retorno = "Martes";
        break;
      }
      case 2: {
        //Miercoles
        retorno = "Miercoles";
        break;
      }
      case 3: {
        //Jueves
        retorno = "Jueves";
        break;
      }
      case 4: {
        //Viernes
        retorno = "Viernes";
        break;
      }
      case 5: {
        //Sabado
        retorno = "Sabado";
        break;
      }
      case 6: {
        //Domingo
        retorno = "Domingo";
      }
    }
    return retorno;
  }


}
