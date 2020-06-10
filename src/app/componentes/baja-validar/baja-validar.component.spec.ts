import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaValidarComponent } from './baja-validar.component';

describe('BajaValidarComponent', () => {
  let component: BajaValidarComponent;
  let fixture: ComponentFixture<BajaValidarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaValidarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaValidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
