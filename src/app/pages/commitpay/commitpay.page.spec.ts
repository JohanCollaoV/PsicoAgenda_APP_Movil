import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommitpayPage } from './commitpay.page';

describe('CommitpayPage', () => {
  let component: CommitpayPage;
  let fixture: ComponentFixture<CommitpayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitpayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
