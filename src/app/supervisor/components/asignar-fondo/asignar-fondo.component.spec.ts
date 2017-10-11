import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarFondoComponent } from './asignar-fondo.component';

describe('AsignarFondoComponent', () => {
  let component: AsignarFondoComponent;
  let fixture: ComponentFixture<AsignarFondoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarFondoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarFondoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
