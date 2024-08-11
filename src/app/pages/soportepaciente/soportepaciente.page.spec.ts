import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoportepacientePage } from './soportepaciente.page';

describe('SoportepacientePage', () => {
  let component: SoportepacientePage;
  let fixture: ComponentFixture<SoportepacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SoportepacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
