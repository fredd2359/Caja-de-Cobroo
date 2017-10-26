import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialValeComponent } from './historial-vale.component';

describe('HistorialValeComponent', () => {
  let component: HistorialValeComponent;
  let fixture: ComponentFixture<HistorialValeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialValeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
