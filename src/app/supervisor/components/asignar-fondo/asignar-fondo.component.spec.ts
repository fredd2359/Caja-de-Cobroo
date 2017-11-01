import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarFolioComponent } from './asignar-fondo.component';

describe('AsignarFolioComponent', () => {
  let component: AsignarFolioComponent;
  let fixture: ComponentFixture<AsignarFolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarFolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
