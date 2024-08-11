import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistropsicologoPage } from './registropsicologo.page';

describe('RegistropsicologoPage', () => {
  let component: RegistropsicologoPage;
  let fixture: ComponentFixture<RegistropsicologoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistropsicologoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
