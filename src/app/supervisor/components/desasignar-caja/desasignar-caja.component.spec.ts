import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesasignarCajaComponent } from './desasignar-caja.component';

describe('DesasignarCajaComponent', () => {
  let component: DesasignarCajaComponent;
  let fixture: ComponentFixture<DesasignarCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesasignarCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesasignarCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
