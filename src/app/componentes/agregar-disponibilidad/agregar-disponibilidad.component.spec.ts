import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDisponibilidadComponent } from './agregar-disponibilidad.component';

describe('AgregarDisponibilidadComponent', () => {
  let component: AgregarDisponibilidadComponent;
  let fixture: ComponentFixture<AgregarDisponibilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDisponibilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
