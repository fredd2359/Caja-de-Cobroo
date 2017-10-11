import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCajaComponent } from './asignar-caja.component';

describe('AsignarCajaComponent', () => {
  let component: AsignarCajaComponent;
  let fixture: ComponentFixture<AsignarCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
