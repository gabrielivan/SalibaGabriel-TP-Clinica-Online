import { Directive, ElementRef, HostListener, Input,
  Renderer2, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appCambioDeColorBotones]'
})
export class CambioDeColorBotonesDirective {

  constructor(private elementRef: ElementRef) { }

  @Input('appCambioDeColorBotones') estadoDelTurno: string;
  estado: string;

  ngOnInit(): void {
    this.estado = this.estadoDelTurno.toString();
    this.cambiarColor(this.estado);
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.estado = this.estadoDelTurno.toString();
    this.cambiarColor(this.estado);
  }
  
  cambiarColor(estado: string) {
    switch (estado) {
      case "1": {
        this.elementRef.nativeElement.style.backgroundColor = '#FFC133';
        this.elementRef.nativeElement.style.color = 'White';
        this.elementRef.nativeElement.innerHTML  = 'Pendiente';
        break;
      }
      case "2": {
        this.elementRef.nativeElement.style.backgroundColor = '#3398FF'; 
        this.elementRef.nativeElement.style.color = 'White';
        this.elementRef.nativeElement.innerHTML  = 'Aceptado';
        break;
      }
      case "3": {
        this.elementRef.nativeElement.style.backgroundColor = '#D73631'; 
        this.elementRef.nativeElement.style.color = 'White';
        this.elementRef.nativeElement.innerHTML  = 'Cancelado';
        break;
      }
      case "4": {
        this.elementRef.nativeElement.style.backgroundColor = '#1CA902'; 
        this.elementRef.nativeElement.style.color = 'White'; 
        this.elementRef.nativeElement.innerHTML  = 'Terminado'; 
        break;
      }
      case "5": {
        this.elementRef.nativeElement.style.backgroundColor = '#3C3A3A'; 
        this.elementRef.nativeElement.style.color = 'White';
        this.elementRef.nativeElement.innerHTML  = 'Rechazado';
        break;
      }
      
    }
    
  }

}
