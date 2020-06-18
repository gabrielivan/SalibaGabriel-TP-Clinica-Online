import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../../servicios/excel.service';
import { FirebaseService } from '../../servicios/firebase.service';
import { OperacionesPorEspecialidad } from '../../clases/operacionesPorEspecialidad';
import { Turno } from 'src/app/clases/turno';
import { ObjetoChart } from 'src/app/clases/objetoChart';
import { Excel3 } from 'src/app/clases/excel3';
import { Excel4 } from 'src/app/clases/excel4';
import { Excel5 } from 'src/app/clases/excel5';

@Component({
  selector: 'app-descargas',
  templateUrl: './descargas.component.html',
  styleUrls: ['./descargas.component.css']
})
export class DescargasComponent implements OnInit {

  objetoParaChart: ObjetoChart;
  verComponenteGraficoDos: boolean = false;
  verComponenteGraficoTres: boolean = false;
  verComponenteGraficoCuatro: boolean = false;
  verComponenteGraficoCinco: boolean = false;
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

  descargarInformeProfesionales(tipoDeInforme: number) {
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
    else if(tipoDeInforme == 3){
      this.descargarExcelInforme3()
    }
    else if(tipoDeInforme == 4){
      this.descargarExcelInforme4()
    }
    else if(tipoDeInforme == 5){
      this.descargarExcelInforme5()
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
        break;
      }
      case 2: {
        this.preparacionDeDataParaGraficosDos();
        this.verComponenteGraficoDos = true;
        break;
      }
      case 3: {
        this.preparacionDeDataParaGraficosTres();
        this.verComponenteGraficoTres = true;
        break;
      }
      case 4: {
        this.preparacionDeDataParaGraficosCuatro();
        this.verComponenteGraficoCuatro = true;
        break;
      }
      case 5: {
        this.preparacionDeDataParaGraficosCinco();
        this.verComponenteGraficoCinco = true;
        break;
      }
    }
  }

  preparacionDeDataParaGraficosDos() {
    this.verComponenteGraficoDos = false;
    this.verComponenteGraficoTres = false;
    this.verComponenteGraficoCuatro = false;
    this.verComponenteGraficoCinco = false;
    this.objetoParaChart = null;
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

  preparacionDeDataParaGraficosTres() {
    this.verComponenteGraficoDos = false;
    this.verComponenteGraficoTres = false;
    this.verComponenteGraficoCuatro = false;
    this.verComponenteGraficoCinco = false;
    this.objetoParaChart = null;
    var objeto = new ObjetoChart([], "", "", []);
    var result = this.turnos.reduce(function (r, a) {
      r[a.profesional.uid] = r[a.profesional.uid] || [];
      r[a.profesional.uid].push(a);
      return r;
    }, Object.create(null));

    console.log(result);
    Object.keys(result).forEach(element => {
      objeto.ObjetoDeLaData.name = "Cantidad de turnos";
      objeto.ObjetoDeLaData.data.push(result[element].length);
      objeto.Categorias.push(result[element][0].profesional.apellido);
    });
    objeto.Data.push(objeto.ObjetoDeLaData);
    objeto.TextoUno = "Profesionales por cantidad de turnos";
    objeto.TextoDos = "Profesionales";
    this.objetoParaChart = objeto;
  }

  preparacionDeDataParaGraficosCuatro() {
    this.verComponenteGraficoDos = false;
    this.verComponenteGraficoTres = false;
    this.verComponenteGraficoCuatro = false;
    this.verComponenteGraficoCinco = false;
    this.objetoParaChart = null;
    var objeto = new ObjetoChart([], "", "", []);
    var lunesArray = [];
    var martesArray = [];
    var miercolesArray = [];
    var juevesArray = [];
    var viernesArray = [];
    var sabadosArray = [];

    this.usuarios.forEach(usuario => {
      if (usuario.tipo == "2") {
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Lunes")) {
          lunesArray.push(usuario);
        }
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Martes")) {
          martesArray.push(usuario);
        }
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Miercoles")) {
          miercolesArray.push(usuario);
        }
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Jueves")) {
          juevesArray.push(usuario);
        }
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Viernes")) {
          viernesArray.push(usuario);
        }
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Sabado")) {
          sabadosArray.push(usuario);
        }
      }
    });
    objeto.ObjetoDeLaData.data.push(lunesArray.length);
    objeto.ObjetoDeLaData.data.push(martesArray.length);
    objeto.ObjetoDeLaData.data.push(miercolesArray.length);
    objeto.ObjetoDeLaData.data.push(juevesArray.length);
    objeto.ObjetoDeLaData.data.push(viernesArray.length);
    objeto.ObjetoDeLaData.data.push(sabadosArray.length);
    objeto.ObjetoDeLaData.name = "Medicos por cantidad de dias";
    objeto.Categorias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    objeto.TextoUno = "Profesionales por cantidad de dias";
    objeto.TextoDos = "Profesionales";
    objeto.Data.push(objeto.ObjetoDeLaData);
    this.objetoParaChart = objeto;
  }

  preparacionDeDataParaGraficosCinco() {
    this.verComponenteGraficoDos = false;
    this.verComponenteGraficoTres = false;
    this.verComponenteGraficoCuatro = false;
    this.verComponenteGraficoCinco = false;
    this.objetoParaChart = null;
    var objeto = new ObjetoChart([], "", "", []);
    var lunesArray = [];
    var martesArray = [];
    var miercolesArray = [];
    var juevesArray = [];
    var viernesArray = [];
    var sabadosArray = [];

    this.auxTurnos.forEach(turno => {
      if (turno.fecha) {
        if (turno.fecha.getDay() == 1) {
          lunesArray.push(turno);
        }
        if (turno.fecha.getDay() == 2) {
          martesArray.push(turno);
        }
        if (turno.fecha.getDay() == 3) {
          miercolesArray.push(turno);
        }
        if (turno.fecha.getDay() == 4) {
          juevesArray.push(turno);
        }
        if (turno.fecha.getDay() == 5) {
          viernesArray.push(turno);
        }
        if (turno.fecha.getDay() == 6) {
          sabadosArray.push(turno);
        }
      }
    });
    objeto.ObjetoDeLaData.data.push(lunesArray.length);
    objeto.ObjetoDeLaData.data.push(martesArray.length);
    objeto.ObjetoDeLaData.data.push(miercolesArray.length);
    objeto.ObjetoDeLaData.data.push(juevesArray.length);
    objeto.ObjetoDeLaData.data.push(viernesArray.length);
    objeto.ObjetoDeLaData.data.push(sabadosArray.length);
    objeto.ObjetoDeLaData.name = "Turnos por dias";
    objeto.Categorias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    objeto.TextoUno = "Cantidad de turnos por día de la semana";
    objeto.TextoDos = "Turnos";
    objeto.Data.push(objeto.ObjetoDeLaData);
    this.objetoParaChart = objeto;
  }

  descargarExcelInforme3(){
    var rv = [];
    var objeto = new Excel3("","");
    var result = this.turnos.reduce(function (r, a) {
      r[a.profesional.uid] = r[a.profesional.uid] || [];
      r[a.profesional.uid].push(a);
      return r;
    }, Object.create(null));

    console.log(result);
    Object.keys(result).forEach(element => {
      objeto.ApellidoProfesional = result[element][0].profesional.apellido;
      objeto.CantidadDeTurnos = result[element].length;
      rv.push(new Excel3(objeto.ApellidoProfesional, objeto.CantidadDeTurnos));
    });
    this.exportarComoExcel(rv, "Profesionales por cantidad de turnos");
  }

  descargarExcelInforme4(){
    var rv = [];
    var objeto = new Excel4("","");
    var lunesArray = [];
    var martesArray = [];
    var miercolesArray = [];
    var juevesArray = [];
    var viernesArray = [];
    var sabadosArray = [];

    this.usuarios.forEach(usuario => {
      if (usuario.tipo == "2") {
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Lunes")) {
          lunesArray.push(usuario);
        }
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Martes")) {
          martesArray.push(usuario);
        }
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Miercoles")) {
          miercolesArray.push(usuario);
        }
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Jueves")) {
          juevesArray.push(usuario);
        }
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Viernes")) {
          viernesArray.push(usuario);
        }
        if (usuario.disponibilidad && usuario.disponibilidad.includes("Sabado")) {
          sabadosArray.push(usuario);
        }
      }
    });
    objeto.DiaDeLaSemana = "Lunes";
    objeto.CantidadDeMedicos = lunesArray.length.toString();
    rv.push(new Excel4(objeto.DiaDeLaSemana, objeto.CantidadDeMedicos));

    objeto.DiaDeLaSemana = "Martes";
    objeto.CantidadDeMedicos = martesArray.length.toString();
    rv.push(new Excel4(objeto.DiaDeLaSemana, objeto.CantidadDeMedicos));

    objeto.DiaDeLaSemana = "Miercoles";
    objeto.CantidadDeMedicos = miercolesArray.length.toString();
    rv.push(new Excel4(objeto.DiaDeLaSemana, objeto.CantidadDeMedicos));

    objeto.DiaDeLaSemana = "Jueves";
    objeto.CantidadDeMedicos = juevesArray.length.toString();
    rv.push(new Excel4(objeto.DiaDeLaSemana, objeto.CantidadDeMedicos));

    objeto.DiaDeLaSemana = "Viernes";
    objeto.CantidadDeMedicos = viernesArray.length.toString();
    rv.push(new Excel4(objeto.DiaDeLaSemana, objeto.CantidadDeMedicos));

    objeto.DiaDeLaSemana = "Sabado";
    objeto.CantidadDeMedicos = sabadosArray.length.toString();
    rv.push(new Excel4(objeto.DiaDeLaSemana, objeto.CantidadDeMedicos));
    this.exportarComoExcel(rv, "Profesionales por cantidad de dias");
  }

  descargarExcelInforme5(){
    this.verComponenteGraficoDos = false;
    this.verComponenteGraficoTres = false;
    this.verComponenteGraficoCuatro = false;
    this.verComponenteGraficoCinco = false;
    this.objetoParaChart = null;
    var objeto = new ObjetoChart([], "", "", []);
    var lunesArray = [];
    var martesArray = [];
    var miercolesArray = [];
    var juevesArray = [];
    var viernesArray = [];
    var sabadosArray = [];

    this.auxTurnos.forEach(turno => {
      if (turno.fecha) {
        if (turno.fecha.getDay() == 1) {
          lunesArray.push(turno);
        }
        if (turno.fecha.getDay() == 2) {
          martesArray.push(turno);
        }
        if (turno.fecha.getDay() == 3) {
          miercolesArray.push(turno);
        }
        if (turno.fecha.getDay() == 4) {
          juevesArray.push(turno);
        }
        if (turno.fecha.getDay() == 5) {
          viernesArray.push(turno);
        }
        if (turno.fecha.getDay() == 6) {
          sabadosArray.push(turno);
        }
      }
    });
    objeto.ObjetoDeLaData.data.push(lunesArray.length);
    objeto.ObjetoDeLaData.data.push(martesArray.length);
    objeto.ObjetoDeLaData.data.push(miercolesArray.length);
    objeto.ObjetoDeLaData.data.push(juevesArray.length);
    objeto.ObjetoDeLaData.data.push(viernesArray.length);
    objeto.ObjetoDeLaData.data.push(sabadosArray.length);
    objeto.ObjetoDeLaData.name = "Turnos por dias";
    objeto.Categorias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    objeto.TextoUno = "Cantidad de turnos por día de la semana";
    objeto.TextoDos = "Turnos";
    objeto.Data.push(objeto.ObjetoDeLaData);
    this.objetoParaChart = objeto;
    console.log(this.objetoParaChart)
  }

}
