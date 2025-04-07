import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBookingUserPage } from './modal-booking-user.page';

describe('ModalBookingUserPage', () => {
  let component: ModalBookingUserPage;
  let fixture: ComponentFixture<ModalBookingUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBookingUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
