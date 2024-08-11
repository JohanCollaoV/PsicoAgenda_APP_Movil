import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarpsicologoPage } from './editarpsicologo.page';

describe('EditarpsicologoPage', () => {
  let component: EditarpsicologoPage;
  let fixture: ComponentFixture<EditarpsicologoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpsicologoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
