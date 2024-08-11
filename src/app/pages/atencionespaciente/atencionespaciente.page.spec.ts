import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtencionespacientePage } from './atencionespaciente.page';

describe('AtencionespacientePage', () => {
  let component: AtencionespacientePage;
  let fixture: ComponentFixture<AtencionespacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionespacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
