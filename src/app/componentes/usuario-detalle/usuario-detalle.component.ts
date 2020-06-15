import { Component, OnInit, Input } from '@angular/core';
import { Usuario, TipoDeUsuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() usuario: any;
  especialidades: any = [];
  especialidadesSeleccionadas: string[] = null;

  constructor() { }

  ngOnInit(): void {
    if (this.usuario.especialidades) {
      this.especialidades = this.usuario.especialidades;
      this.especialidadesSeleccionadas = this.usuario.especialidades;
    }
  }

  esProfesional() {
    return this.usuario.tipo == TipoDeUsuario.Profesional;
  }

}
