import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajasAsignadasComponent } from './cajas-asignadas.component';

describe('CajasAsignadasComponent', () => {
  let component: CajasAsignadasComponent;
  let fixture: ComponentFixture<CajasAsignadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajasAsignadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajasAsignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
