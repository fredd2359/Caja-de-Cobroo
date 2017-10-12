import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoAsignadoComponent } from './fondo-asignado.component';

describe('FondoAsignadoComponent', () => {
  let component: FondoAsignadoComponent;
  let fixture: ComponentFixture<FondoAsignadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FondoAsignadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FondoAsignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
