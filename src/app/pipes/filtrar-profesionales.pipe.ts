import { Pipe, PipeTransform } from '@angular/core';
import { Profesional } from '../clases/profesional';

@Pipe({
  name: 'filtrarProfesionales'
})
export class FiltrarProfesionalesPipe implements PipeTransform {

  transform(profesionales: any[], especialidadSeleccionada: string): any {
    var retorno = [];
    if (especialidadSeleccionada != "Sin especialidad") {
      profesionales.forEach(p => {
        if (p.especialidades && p.especialidades.length > 0) {
          p.especialidades.forEach(e => {
            if (e == especialidadSeleccionada) {
              retorno.push(p);
            }
          });
        }
      });
    }
    else {
      retorno = profesionales;
    }
    return retorno;
  }
}
