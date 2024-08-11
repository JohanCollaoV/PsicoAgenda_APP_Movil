import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistropacientePage } from './registropaciente.page';

describe('RegistropacientePage', () => {
  let component: RegistropacientePage;
  let fixture: ComponentFixture<RegistropacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistropacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
