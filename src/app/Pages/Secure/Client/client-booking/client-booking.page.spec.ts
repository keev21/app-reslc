import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientBookingPage } from './client-booking.page';

describe('ClientBookingPage', () => {
  let component: ClientBookingPage;
  let fixture: ComponentFixture<ClientBookingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
