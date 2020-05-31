import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTurnoComponent } from './agregar-turno.component';

describe('AgregarTurnoComponent', () => {
  let component: AgregarTurnoComponent;
  let fixture: ComponentFixture<AgregarTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
