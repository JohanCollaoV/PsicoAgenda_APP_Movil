import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatpsicologoPage } from './chatpsicologo.page';

describe('ChatpsicologoPage', () => {
  let component: ChatpsicologoPage;
  let fixture: ComponentFixture<ChatpsicologoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatpsicologoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
