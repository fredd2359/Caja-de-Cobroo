import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesasignarFolioPagoComponent } from './desasignar-folio-pago.component';

describe('DesasignarFolioPagoComponent', () => {
  let component: DesasignarFolioPagoComponent;
  let fixture: ComponentFixture<DesasignarFolioPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesasignarFolioPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesasignarFolioPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
