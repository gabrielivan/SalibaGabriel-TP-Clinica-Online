import { Pipe, PipeTransform } from '@angular/core';
import { element } from 'protractor';
import { Horario } from '../clases/horario';
import { Estado } from '../clases/turno';

@Pipe({
  name: 'filtrarHorarios'
})
export class FiltrarHorariosPipe implements PipeTransform {

  transform(horarios: any[], filtros: any): any {
    var retorno = [];
    if (filtros != null) {
      var auxDia = filtros.fechaSeleccionada.getDay() - 1;
      var dia = this.conversorDia(auxDia);
      horarios.forEach(horario => {
        var isValid = false;
        //filtro por disponibilidad del profesional
        filtros.diasHorariosDisponibles.forEach(disponibilidad => {
          if (disponibilidad.Dia == dia && disponibilidad.Hora == horario.hora.toString()) { //todos los horarios en donde puede atenderte el profesional sin tener en cuenta el turno que este asignado a esa hora en ese dia
            //joya, un profesional atiende el dia seleccionado y la current hora
            isValid = true;
          }
        });

        if (isValid) {
          //filtro por turnos ocupados
          var horarioEstaDisponible = true;
          filtros.turnos.forEach(turno => {//recorro turno por turno
            if (turno.estado == Estado.Aceptado || turno.estado == Estado.Pendiente) {

              if (turno.fecha.getFullYear() == filtros.fechaSeleccionada.getFullYear()
                && turno.fecha.getMonth() == filtros.fechaSeleccionada.getMonth()
                && turno.fecha.getDate() == filtros.fechaSeleccionada.getDate()
              ) {
                //si el dia del turno es igual al dia que se eligio                
                if (turno.fecha.getHours() == horario.hora) {//si la hora del turno es igual a la hora que queres marcar como disponible
                  if (turno.fecha.getMinutes() == horario.minutos) {//si los minutos del turno NO SON igual a los minutos que queres marcar como disponible
                    horarioEstaDisponible = false;
                  }
                }
              }
            }
          });
          if (horarioEstaDisponible) {
            retorno.push(horario);
          }
        }

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
