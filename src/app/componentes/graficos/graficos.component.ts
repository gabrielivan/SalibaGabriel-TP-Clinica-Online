import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ObjetoChart } from 'src/app/clases/objetoChart';
import HighchartExporting from 'highcharts/modules/exporting';
import HighchartExportData from 'highcharts/modules/export-data';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  @Input() objeto: ObjetoChart;

  chartOptions;
  highcharts;
  title;
  data;
  textoUno;
  textoDos;
  categorias;

  constructor() { }

  ngOnInit(): void {
    this.title = 'myHighchart';
    this.data = this.objeto.Data;
    this.highcharts = Highcharts;
    this.textoUno = this.objeto.TextoUno;
    this.textoDos = this.objeto.TextoDos;
    this.categorias = this.objeto.Categorias;
    this.chartOptions = {
      chart: {
        type: "column"
      },
      title: {
        text: this.textoUno
      },
      xAxis: {
        categories: this.categorias
      },
      yAxis: {
        title: {
          text: this.textoDos
        }
      },
      series: this.data
    };

    HighchartExporting(Highcharts);
    HighchartExportData(Highcharts);
  }

  // title = 'myHighchart';

  // data = [{
  //   name: 'Cantidad de operaciones',
  //   data: [3, 6, 9]
  // },
  // {
  //   name: 'Cantidad de operaciones',
  //   data: [5, 10, 15]
  // }];

  // highcharts = Highcharts;

  // chartOptions = {
  //   chart: {
  //     type: "column"
  //   },
  //   title: {
  //     text: this.textoUno
  //   },
  //   xAxis: {
  //     categories: this.categorias
  //   },
  //   yAxis: {
  //     title: {
  //       text: this.textoDos
  //     }
  //   },
  //   series: this.data
  // };

}
