import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminBookingPage } from './admin-booking.page';

describe('AdminBookingPage', () => {
  let component: AdminBookingPage;
  let fixture: ComponentFixture<AdminBookingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
