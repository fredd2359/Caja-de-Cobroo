import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesasignarFolioValeComponent } from './desasignar-folio-vale.component';

describe('DesasignarFolioValeComponent', () => {
  let component: DesasignarFolioValeComponent;
  let fixture: ComponentFixture<DesasignarFolioValeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesasignarFolioValeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesasignarFolioValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
