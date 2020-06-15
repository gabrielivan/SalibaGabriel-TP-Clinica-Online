import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-descargas',
  templateUrl: './descargas.component.html',
  styleUrls: ['./descargas.component.css']
})
export class DescargasComponent implements OnInit {

  especialidadSeleccionada: string = "";
  diaSeleccionado: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
