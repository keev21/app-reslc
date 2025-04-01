import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBookingPage } from './modal-booking.page';

describe('ModalBookingPage', () => {
  let component: ModalBookingPage;
  let fixture: ComponentFixture<ModalBookingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
