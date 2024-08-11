import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PsicologoPage } from './psicologo.page';

describe('PsicologoPage', () => {
  let component: PsicologoPage;
  let fixture: ComponentFixture<PsicologoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
