import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'myHighchart';

  // data = [{
  //   name: 'ItSolutionStuff.com',
  //   data: [1, 2, 3, 4]
  // }, {
  //   name: 'Nicesnippets.com',
  //   data: [3, 6, 9, 12]
  // }];

  data = [{
    name: 'Cantidad de operaciones',
    data: [3, 6, 9]
  },
  {
    name: 'Cantidad de operaciones',
    data: [5, 10, 15]
  }];

  highcharts = Highcharts;
  chartOptions = {
    chart: {
      type: "column"
    },
    title: {
      text: "Cantidad de operaciones por especialidad"
    },
    xAxis: {
      categories: ["Cardiologia", "Traumatologia", "Dermatologia"]
    },
    yAxis: {
      title: {
        text: "Profesionales"
      }
    },
    series: this.data
  };

}
