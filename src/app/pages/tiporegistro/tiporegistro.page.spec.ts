import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiporegistroPage } from './tiporegistro.page';

describe('TiporegistroPage', () => {
  let component: TiporegistroPage;
  let fixture: ComponentFixture<TiporegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TiporegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
