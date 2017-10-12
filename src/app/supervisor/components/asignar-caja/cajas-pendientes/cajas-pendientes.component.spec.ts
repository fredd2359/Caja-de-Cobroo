import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajasPendientesComponent } from './cajas-pendientes.component';

describe('CajasPendientesComponent', () => {
  let component: CajasPendientesComponent;
  let fixture: ComponentFixture<CajasPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajasPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
