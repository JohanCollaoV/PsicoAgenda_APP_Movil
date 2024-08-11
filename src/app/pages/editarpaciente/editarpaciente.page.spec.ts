import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarpacientePage } from './editarpaciente.page';

describe('EditarpacientePage', () => {
  let component: EditarpacientePage;
  let fixture: ComponentFixture<EditarpacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
