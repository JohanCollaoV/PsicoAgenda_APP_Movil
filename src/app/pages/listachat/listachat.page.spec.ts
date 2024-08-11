import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListachatPage } from './listachat.page';

describe('ListachatPage', () => {
  let component: ListachatPage;
  let fixture: ComponentFixture<ListachatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListachatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
