import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FichapsicologoPage } from './fichapsicologo.page';

describe('FichapsicologoPage', () => {
  let component: FichapsicologoPage;
  let fixture: ComponentFixture<FichapsicologoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FichapsicologoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
