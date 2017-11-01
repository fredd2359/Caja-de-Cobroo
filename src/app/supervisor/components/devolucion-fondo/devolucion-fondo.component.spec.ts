import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionFondoComponent } from './devolucion-fondo.component';

describe('DevolucionFondoComponent', () => {
  let component: DevolucionFondoComponent;
  let fixture: ComponentFixture<DevolucionFondoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionFondoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionFondoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
