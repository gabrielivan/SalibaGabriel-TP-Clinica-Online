import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../../servicios/excel.service';

@Component({
  selector: 'app-descargas',
  templateUrl: './descargas.component.html',
  styleUrls: ['./descargas.component.css']
})
export class DescargasComponent implements OnInit {

  especialidadSeleccionada: string = "";
  diaSeleccionado: string = "";

  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  constructor(private excelService: ExcelService) { }

  ngOnInit(): void {
  }

  exportarComoExcel(): void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }

}
