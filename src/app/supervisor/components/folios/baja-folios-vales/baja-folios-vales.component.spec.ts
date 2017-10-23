import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaFoliosValesComponent } from './baja-folios-vales.component';

describe('BajaFoliosValesComponent', () => {
  let component: BajaFoliosValesComponent;
  let fixture: ComponentFixture<BajaFoliosValesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaFoliosValesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaFoliosValesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
