import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../../servicios/excel.service';
import { FirebaseService } from '../../servicios/firebase.service';
import { OperacionesPorEspecialidad } from '../../clases/operacionesPorEspecialidad';
import { Turno } from 'src/app/clases/turno';
import { ObjetoChart } from 'src/app/clases/objetoChart';

@Component({
  selector: 'app-descargas',
  templateUrl: './descargas.component.html',
  styleUrls: ['./descargas.component.css']
})
export class DescargasComponent implements OnInit {

  objetoParaChart: ObjetoChart;
  verComponenteGrafico: boolean = false;
  logProfesionales: any[];
  diaSeleccionado: string = "";
  usuarios: any = [];
  auxTurnos: any = [];
  turnos: any = [];

  constructor(private excelService: ExcelService, public firebaseService: FirebaseService) { }

  async ngOnInit() {
    // await this.delay(3000);
    this.logProfesionales = await this.firebaseService.getLogProfesionales();
    this.logProfesionales.forEach(log => {
      log.fecha = this.stringFecha(log.fecha);
    });
    this.usuarios = await this.firebaseService.getUsers();
    this.auxTurnos = await this.firebaseService.getShifts();
    this.mapearTurnos(this.auxTurnos, this.turnos);
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  exportarComoExcel(data: any, nombre: string): void {
    this.excelService.exportAsExcelFile(data, nombre);
  }

  descargarInformeProfesionales(tipoDeDescarga: number, tipoDeInforme: number) {
    if (tipoDeDescarga == 1) {//excel
      if (tipoDeInforme == 1) {//Días y horarios que ingresaron al sistema
        this.exportarComoExcel(this.logProfesionales, "Log de Profesionales");
      }
      else if (tipoDeInforme == 2) {//Cantidad de operaciones por especialidad
        var rv = [];
        var helper = {};
        var result = this.turnos.reduce(function (r, o) {
          var key = o.profesional.uid + '-' + o.especialidadAtendida;

          if (!helper[key]) {
            helper[key] = Object.assign({}, o);
            r.push(helper[key]);
          } else {
            helper[key].instances += o.instances;
          }

          return r;
        }, []);

        result.forEach(r => {
          rv.push(new OperacionesPorEspecialidad(r.profesional.nombre, r.profesional.apellido, r.especialidadAtendida, r.instances.toString()));
        });
        this.exportarComoExcel(rv, "Operaciones por especialidad");
      }
    }
    else if (tipoDeDescarga == 2) {//pdf

    }
  }

  stringFecha(fecha: any) {
    var retorno = "";
    var year = fecha.getFullYear().toString();
    var month = (fecha.getMonth() + 1).toString();
    var date = fecha.getDate().toString();
    var hours = fecha.getHours().toString();
    var minutes = fecha.getMinutes().toString();
    if (minutes == "0") {
      minutes = "00";
    }
    retorno = date.concat("/", month, "/", year, " ", hours, ":", minutes, " hs.");
    return retorno;

  }

  mapearTurnos(auxTurnos: any[], turnos: any[]) {
    var turno = {
      fecha: "",
      estado: "",
      encuesta: "",
      encuestaProfesional: "",
      resena: "",
      profesional: "",
      paciente: "",
      especialidadAtendida: "",
      instances: 1
    }
    auxTurnos.forEach(auxTurno => {
      turno.fecha = this.stringFecha(auxTurno.fecha);
      turno.estado = auxTurno.estado;
      turno.encuesta = auxTurno.encuesta;
      turno.encuestaProfesional = auxTurno.encuestaProfesional;
      turno.resena = auxTurno.resena;
      turno.profesional = this.getUsuario(auxTurno.idProfesional);
      turno.paciente = this.getUsuario(auxTurno.idPaciente);
      turno.especialidadAtendida = auxTurno.especialidadAtendida;
      turnos.push(JSON.parse(JSON.stringify(turno)));
      this.limpiarTurno(turno);
    });
  }

  limpiarTurno(turno: any) {
    turno.fecha = "";
    turno.estado = "";
    turno.encuesta = "";
    turno.encuestaProfesional = "";
    turno.resena = "";
    turno.profesional = "";
    turno.paciente = "";
  }

  getUsuario(id: string) {
    var rv: any;
    this.usuarios.forEach(usr => {
      if (usr.uid == id) {
        rv = usr;
      }
    });
    return rv;
  }

  verGrafico(tipo: number) {
    
    switch (tipo) {
      case 1: {
        this.preparacionDeDataParaGraficos(1);
        break;
      }
      case 2: {
        this.preparacionDeDataParaGraficos(2);
        this.verComponenteGrafico = true;
        break;
      }
      case 3: {
        this.preparacionDeDataParaGraficos(3);
        break;
      }
      case 4: {
        this.preparacionDeDataParaGraficos(4);
        break;
      }
      case 5: {
        this.preparacionDeDataParaGraficos(5);
        break;
      }
    }
  }

  preparacionDeDataParaGraficos(tipo: number) {
    if (tipo == 2) {
      var objeto = new ObjetoChart([], "", "", []);
      var rv = [];
      var helper = {};
      var result = this.turnos.reduce(function (r, o) {
        var key = o.profesional.uid + '-' + o.especialidadAtendida;

        if (!helper[key]) {
          helper[key] = Object.assign({}, o);
          r.push(helper[key]);
        } else {
          helper[key].instances += o.instances;
        }

        return r;
      }, []);

      result.forEach(r => {
        rv.push(new OperacionesPorEspecialidad(r.profesional.nombre, r.profesional.apellido, r.especialidadAtendida, r.instances));
      });
      console.log(rv);
      rv.forEach(element => {
        objeto.ObjetoDeLaData.name = "Cantidad de operaciones";
        objeto.ObjetoDeLaData.data.push(element.Cantidad);
        objeto.Categorias.push(element.Especialidad);
      });
      objeto.Data.push(objeto.ObjetoDeLaData);
      objeto.TextoUno = "Cantidad de operaciones por especialidad";
      objeto.TextoDos = "Profesionales";
      this.objetoParaChart = objeto;

    }
  }

}
